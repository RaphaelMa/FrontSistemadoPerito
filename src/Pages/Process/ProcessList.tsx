import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { message } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import moment from 'moment'
import { useNavigate } from 'react-router'
import { useUserSelector } from 'Redux/UserReducer'
import { scapeRegex, removeFalsyValues } from 'Utils/functions'
import messageError from 'Utils/messageError'
import Header from './Header'
import processModal from './processModal'
import Table from './ProcessTable'
import { LocalFiltersType, ProcessType, GenericType, VisibleColumnType } from './types'
import useColumns from './useColumns'
import useDestroyProcess from './useDestroyProcess'
import useGetProcesses from './useGetProcesses'
import styled from 'styled-components'
import { cloneDeep, uniqBy } from 'lodash'
import useGetVisibleColumns from './useGetVisibleColumns'
import useSaveVisibleColumns from './useSaveVisibleColumns'
import useSaveStorage from '../../Utils/useSaveStorage'
import useExportData from './useExportData'

const multiple_select_array = [
  'financialSituation_id',
  'situation_id',
  'judicialDistrict_id',
  'nature_id',
  'multicompany_id',
  'statusImpeachment_id'
]

export const INITIAL_FILTERS: LocalFiltersType = {
  pagination: {
    current_page: 1,
    page_size: 20
  },
  sort: {
    field: 'processNumber',
    order: 'ascend'
  },
  dates: undefined,
  person_id: undefined
}

const ProcessList: React.FC = () => {
  const [visible_columns, setVisibleColumns] = useState<VisibleColumnType>()
  const [data, setData] = useState<ProcessType[]>([])
  const [filters, setFilters] = useSaveStorage<any>('process-filters-list', INITIAL_FILTERS)

  const permissions = useUserSelector(state => state.permissions)

  const [{ loading }, getProcesses] = useGetProcesses()
  const [{ loading: columns_loading }, getVisibleColumns] = useGetVisibleColumns()
  const [saveVisibleColumns, { loading: save_columns_loading }] = useSaveVisibleColumns()
  const [destroyProcess, { loading: destroy_loading }] = useDestroyProcess()
  const navigate = useNavigate()

  const loadProcesses = async () => {
    try {
      const columns_response = await getVisibleColumns()
      setVisibleColumns(columns_response.data)

      const response = await getProcesses()
      setData(response.data)
    } catch (error) {
      messageError('202008252245')
    }
  }

  useEffect(() => {
    loadProcesses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenDrawer = (id?: string) => {
    if (id) {
      const process = data.find(process => process._id === id)

      process!.statusImport_key === 'importing' ? processModal() : navigate(`/process/${id}`)
    } else {
      navigate('/process')
    }
  }

  const onPressEnter = useCallback((value: string, object_key: 'search' | 'person_name') => {
    setFilters((old_filters: any) => ({ ...old_filters, [object_key]: scapeRegex(value) }))
  }, [setFilters])

  const handleDelete = async (id: string) => {
    try {
      const response = await destroyProcess(id)
      if (response.data.success) {
        message.success('Processo excluído com sucesso')
        setData((prev) => prev.filter(process => process._id !== id))
      }
    } catch (error) {
      messageError('202008262002')
    }
  }

  const handleTableChange = useCallback((
    pagination: TablePaginationConfig,
    filter: Record<string, React.Key[] | null>,
    sorter: any
  ): void => {
    let internal_filters: LocalFiltersType = filters

    if (sorter?.column?.sorter) {
      internal_filters = { ...internal_filters, sort: { order: sorter.order, field: sorter.field } }
    }

    internal_filters = {
      ...internal_filters,
      pagination: {
        current_page: pagination.current || internal_filters.pagination.current_page,
        page_size: pagination.pageSize || internal_filters.pagination.page_size
      }
    }
    setFilters(internal_filters)
  }, [filters, setFilters])

  const updateProcessPushStatus = (process_id: string, status: boolean) => {
    setData(old_processes => {
      const index = old_processes.findIndex(p => p._id === process_id)
      const process = { ...old_processes[index], statusProcessMonitoring: status }
      const new_processes = cloneDeep(old_processes)

      new_processes[index] = process

      return new_processes
    })
  }

  const updateProcessFavorite = (process_id: string, value: boolean) => {
    setData(old_processes => {
      const index = old_processes.findIndex(p => p._id === process_id)
      const process = { ...old_processes[index], favorite: value }
      const new_processes = cloneDeep(old_processes)

      new_processes[index] = process

      return new_processes
    })
  }

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.process.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Processo"
        />
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [permissions])

  const columns = useColumns({
    handleDelete,
    handleEdit: handleOpenDrawer,
    updateProcessPushStatus,
    updateProcessFavorite,
    visible_columns
  })

  const filterByPersonId = useCallback((data: GenericType[] = [], person_id: string) => (
    data?.some(item => item.people.people_id === person_id)
  ), [])

  const filtered_data = useMemo(() => {
    const filtered_data = data.filter(process => (
      Object.keys(removeFalsyValues(filters))
        .filter(filter => (filter !== 'pagination' && filter !== 'sort' && filter !== 'search'))
        .reduce((acc: Boolean, key) => {
          if (key === 'person_id') {
            const person_id = filters[key]

            const person = filterByPersonId(process?.peoples, person_id)
            const active_pole_person = filterByPersonId(process?.activePole, person_id)
            const passive_pole_person = filterByPersonId(process?.passivePole, person_id)

            const has_person = person || active_pole_person || passive_pole_person

            return acc && has_person
          }

          if (key === 'kind_person_id') {
            const { kind_person_id } = filters
            type key_type = 'peoples' | 'activePole' | 'passivePole'
            const person_keys_arr: key_type[] = ['peoples', 'activePole', 'passivePole']

            const testKindPersonId = (people: { kindPeople: { kindPeople_id: string } }) => (
              kind_person_id!.includes(people.kindPeople.kindPeople_id)
            )

            return person_keys_arr.reduce((acc: boolean, key) => acc || !!process[key]?.some(testKindPersonId), false)
          }

          if (key === 'dates') {
            const start_date = filters.dates[0]
            const end_date = filters.dates[1]
            const date = moment(process.createAt, 'YYYY-MM-DD')

            return acc && date.isBetween(start_date, end_date, 'days', '[]')
          }

          // quando são multiplos
          if (multiple_select_array.includes(key)) {
            // @ts-ignore
            return acc && !!filters[key]?.includes(process[key] || '')
          }

          // @ts-ignore
          return acc && (process[key] === filters[key])
        }, true)
    ))

    const max_page = Math.ceil(filtered_data.length / filters.pagination.page_size)

    if (max_page < filters.pagination.current_page && filters.pagination.current_page !== Math.max(max_page, 1)) {
      setFilters((prev: { pagination: any }) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          current_page: Math.max(max_page, 1)
        }
      }))
    }

    return filtered_data
  }, [data, filters, filterByPersonId, setFilters])

  const handleSaveVisibleColumns = useCallback(async () => {
    if (!visible_columns) return

    try {
      const response = await saveVisibleColumns(visible_columns)
      if (response.data.success) {
        message.success('Colunas atualizadas com sucesso!')
      }
    } catch (error) {
      messageError('202103282022')
    }
  }, [saveVisibleColumns, visible_columns])

  const non_duplicated_process_number = useMemo(() => uniqBy(data, 'processNumber').filter(proc => proc.processNumber), [data])

  const exportToXLS = useExportData(filtered_data, visible_columns)

  return (
    <Container>
      <Header
        filters={filters}
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        button_text="Novo Processo"
        handleNew={handleOpenDrawer}
        process_number={non_duplicated_process_number}
        visible_columns={visible_columns}
        setVisibleColumns={setVisibleColumns}
        columns_loading={columns_loading}
        handleSaveVisibleColumns={handleSaveVisibleColumns}
        save_columns_loading={save_columns_loading}
        exportToXLS={exportToXLS}
      />

      <Table
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroy_loading}
        locale={locale}
      />
    </Container>
  )
}

export default ProcessList

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 2rem 2rem;
  overflow-x: scroll !important;
`
