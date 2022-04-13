import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TablePaginationConfig } from 'antd/es/table'
import { Key } from 'antd/lib/table/interface'
import { StatusImpeachment } from './types'
import StatusImpeachmntTable from './StatusImpeachmntTable'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import HeaderActions from 'Components/MainList/HeaderActions'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import ContainerList from 'Components/MainList/ContainerList'
import useColumns from './useColumns'
import StatusDrawer, { StatusDrawerType } from 'Components/Drawers/StatusImpugnation/StatusImpugnationDrawer'
import useGetStatusImpeachments from './useGetStatusImpeachments'
import messageError from 'Utils/messageError'
import useDestroyStatusImpeachment from './useDestroyStatusImpeachment'
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

const StatusImpeachments: React.FC = () => {

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<StatusImpeachment[]>([])
  const StatusDrawerRef = useRef<StatusDrawerType>(null)
  const [{ loading }, getStatuses] = useGetStatusImpeachments()
  const [destroyStatus, { loading: destroy_loading }] = useDestroyStatusImpeachment()

  const loadStatuses = async () => {
    try {
      const response = await getStatuses()
      setData(response.data)
    } catch (error) {
      messageError('202105161935')
    }
  }

  useEffect(() => {
    loadStatuses()
    // eslint-disable-next-line
  }, [])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleTableChange = useCallback((
    pagination: TablePaginationConfig,
    _filter: Record<string, Key[] | null>,
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

  const handleOpenDrawer = (id?: string) => {
    StatusDrawerRef.current?.open(id)
  }

  const locale = useMemo(() => ({
    emptyText: (
      <EmptyComponent
        onClick={() => handleOpenDrawer()}
        action_text="Status de impugnação"
      />
    ),
  }), [])


  const handleDelete = async (id: string) => {
    try {
      const response = await destroyStatus(id)
      if (response.data.success) {
        message.success('Status de impugnação excluído com sucesso')
        setData((prev) => prev.filter(person => person._id !== id))
      }
    } catch (error) {
      messageError('202105161946')
    }
  }

  const afterSave = (status: StatusImpeachment) => {
    setData(prev => {
      const prev_status = data.find(p => p._id === status._id)

      if (prev_status) {
        const old_status = prev.filter(p => p._id !== status._id)

        return [...old_status, status]
      }

      return [...prev, status]
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
        placeholder="Informe status impugnação"
        button_text="Novo Status"
        handleNew={handleOpenDrawer}
        has_create_permission={true}
        exportToXLS={exportToXLS}
      />

      <StatusImpeachmntTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroy_loading}
        locale={locale}
      />

      <StatusDrawer afterSave={afterSave} ref={StatusDrawerRef}/>
    </ContainerList>
  )
}

export default StatusImpeachments
