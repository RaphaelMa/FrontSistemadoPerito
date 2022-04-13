import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TablePaginationConfig } from 'antd/es/table'
import HeaderActions from 'Components/MainList/HeaderActions'
import ContainerList from 'Components/MainList/ContainerList'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import Table from './ProcessFinancialSituationTable'
import useColumns from './useColumns'
import { ProcessFinancialSituationType } from './types'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useGetProcessFinancialSituations from './useGetProcessFinancialSituations'
import messageError from 'Utils/messageError'
import ProcessFinancialSituationDrawer, { ProcessFinancialSituationDrawerRefType } from 'Components/Drawers/ProcessFinancialSituation/ProcessFinancialSituation'
import useDestroyProcessFinancialSituation from './useDestroyProcessFinancialSituation'
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

const ProcessFinancialSituationList: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<ProcessFinancialSituationType[]>([])
  const [{ loading }, getProcessFinancialSituation] = useGetProcessFinancialSituations()
  const [destroyProcessFinancialSituation, { loading: destroy_loading }] = useDestroyProcessFinancialSituation()
  const processFinancialSituationDrawerRef = useRef<ProcessFinancialSituationDrawerRefType>(null)

  const loadProcessFinancialSituations = async () => {
    try {
      const response = await getProcessFinancialSituation()
      setData(response.data)
    } catch (error) {
      messageError('202008252245')
    }
  }

  useEffect(() => {
    loadProcessFinancialSituations()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer = (id?: string) => {
    processFinancialSituationDrawerRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await destroyProcessFinancialSituation(id)
      if (response.data.success) {
        message.success('Situação financeira excluída com sucesso')
        setData((prev) => prev.filter(financial_situation => financial_situation._id !== id))
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
      permissions?.processFinancialSituation.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Nova Situação"
        />
      )
    ),
  }), [permissions])

  const afterSave = (financial_situation: ProcessFinancialSituationType) => {
    setData(prev => {
      const prev_financial_situation = data.find(key => key._id === financial_situation._id)

      if (prev_financial_situation) {
        const financial_situations = prev.filter(key => key._id !== financial_situation._id)

        return [...financial_situations, financial_situation]
      }

      return [...prev, financial_situation]
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
        placeholder="Informe situação financeira do processo"
        button_text="Nova Situação Financeira"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.processFinancialSituation.create}
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
      <ProcessFinancialSituationDrawer ref={processFinancialSituationDrawerRef} afterSave={afterSave}/>
    </ContainerList>
  )
}

export default ProcessFinancialSituationList
