import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TablePaginationConfig } from 'antd/es/table'
import HeaderActions from 'Components/MainList/HeaderActions'
import ContainerList from 'Components/MainList/ContainerList'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import Table from './ProcessNatureTable'
import useColumns from './useColumns'
import { ProcessNatureType } from './types'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useGetProcessNatures from './useGetProcessNatures'
import messageError from 'Utils/messageError'
import ProcessNature, { ProcessNatureDrawerRefType } from 'Components/Drawers/ProcessNature/ProcessNature'
import useDestroyProcessNature from './useDestroyProcessNature'
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

const ProcessNatureList: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<ProcessNatureType[]>([])
  const [{ loading }, getProcessNatures] = useGetProcessNatures()
  const [destroyProcessNature, { loading: destroy_loading }] = useDestroyProcessNature()
  const processNatureRef = useRef<ProcessNatureDrawerRefType>(null)

  const loadProcessNatures = async () => {
    try {
      const response = await getProcessNatures()
      setData(response.data)
    } catch (error) {
      messageError('202008252245')
    }
  }

  useEffect(() => {
    loadProcessNatures()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer = (id?: string) => {
    processNatureRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await destroyProcessNature(id)
      if (response.data.success) {
        message.success('Natureza excluída com sucesso')
        setData((prev) => prev.filter(nature => nature._id !== id))
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
      permissions?.processNature.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Natureza do Processo"
        />
      )
    ),
  }), [permissions])

  const afterSave = (nature: ProcessNatureType) => {
    setData(prev => {
      const prev_nature = data.find(key => key._id === nature._id)

      if (prev_nature) {
        const natures = prev.filter(key => key._id !== nature._id)

        return [...natures, nature]
      }

      return [...prev, nature]
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
        placeholder="Informe a natureza do processo"
        button_text="Nova Natureza"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.processNature.create}
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
      <ProcessNature ref={processNatureRef} afterSave={afterSave}/>
    </ContainerList>
  )
}

export default ProcessNatureList
