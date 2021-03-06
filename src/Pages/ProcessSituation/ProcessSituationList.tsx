import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TablePaginationConfig } from 'antd/es/table'
import HeaderActions from 'Components/MainList/HeaderActions'
import ContainerList from 'Components/MainList/ContainerList'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import Table from './ProcessSituationTable'
import useColumns from './useColumns'
import { ProcessSituationType } from './types'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useGetProcessSituations from './useGetProcessSituations'
import messageError from 'Utils/messageError'
import ProcessSituationDrawer, { ProcessSituationDrawerRefType } from 'Components/Drawers/ProcessSituation/ProcessSituation'
import useDestroyProcessSituation from './useDestroyProcessSituation'
import { useUserSelector } from 'Redux/UserReducer'
import { message } from 'antd'
import useExportData from './useExportData'

const initial_filters: FiltersType = {
  search: '',
  pagination: {
    current_page: 1,
    page_size: 20,
  },
  sort: {
    field: 'description',
    order: 'ascend',
  },
}

const columns_keys = ['description']

const ProcessSituationList: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<ProcessSituationType[]>([])
  const [{ loading }, getProcessSituation] = useGetProcessSituations()
  const [destroyProcessSituation, { loading: destroy_loading }] = useDestroyProcessSituation()
  const processSituationDrawerRef = useRef<ProcessSituationDrawerRefType>(null)

  const loadProcessSituation = async () => {
    try {
      const response = await getProcessSituation()
      setData(response.data)
    } catch (error) {
      messageError('202008252245')
    }
  }

  useEffect(() => {
    loadProcessSituation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer = (id?: string) => {
    processSituationDrawerRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await destroyProcessSituation(id)
      if (response.data.success) {
        message.success('Situa????o exclu??da com sucesso')
        setData((prev) => prev.filter(situation => situation._id !== id))
      }
    } catch (error) {
      messageError('202008262002')
    }
  }

  const handleTableChange = useCallback((
    pagination: TablePaginationConfig,
    filter: Record<string, React.Key[] | null>,
    sorter: any,
  ): void => {
    let internal_filters: FiltersType = filters

    if (sorter?.column?.sorter) {
      internal_filters = { ...internal_filters, sort: { order: sorter.order, field: sorter.field } }
    }

    internal_filters = {
      ...internal_filters,
      pagination: {
        current_page: pagination.current || internal_filters!.pagination!.current_page,
        page_size: pagination.pageSize || internal_filters!.pagination!.page_size,
      },
    }
    setFilters(internal_filters)
  }, [filters])

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.processSituation.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Situa????o"
        />
      )
    ),
  }), [permissions])

  const afterSave = (situation: ProcessSituationType) => {
    setData(prev => {
      const prev_situation = data.find(key => key._id === situation._id)

      if (prev_situation) {
        const situations = prev.filter(key => key._id !== situation._id)

        return [...situations, situation]
      }

      return [...prev, situation]
    })
  }

  const columns = useColumns({ handleDelete, handleEdit: handleOpenDrawer })
  const filtered_data = useMemo(() => filterData({ data, filters, columns_keys }), [filters, data])

  const exportToXLS = useExportData(filtered_data)

  return (
    <ContainerList>
      <HeaderActions
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        placeholder="Informe a situa????o do processo"
        button_text="Nova Situa????o"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.processSituation.create}
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
      <ProcessSituationDrawer ref={processSituationDrawerRef} afterSave={afterSave}/>
    </ContainerList>
  )
}

export default ProcessSituationList
