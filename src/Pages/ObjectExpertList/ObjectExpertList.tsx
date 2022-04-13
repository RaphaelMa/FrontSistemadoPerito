import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import ContainerList from 'Components/MainList/ContainerList'
import HeaderActions from 'Components/MainList/HeaderActions'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { ObjectExpertType } from './types'
import ObjectExpertTable from './ObjectExpertTable'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useColumns from './useColumns'
import { Key } from 'antd/lib/table/interface'
import useGetObjectExpert from './useGetObjectExpert'
import messageError from 'Utils/messageError'
import ObjectExpertDrawer, { ObjectExpertDrawerType } from 'Components/Drawers/ObjectExpert/ObjectExpert'
import useDestroyObjectExpert from './useDestroyObjectExpert'
import { message } from 'antd'
import { useUserSelector } from 'Redux/UserReducer'
import useExportData from './useExportData'

const initial_filters: FiltersType = {
  search: '',
  pagination: {
    current_page: 1,
    page_size: 10
  },
  sort: {
    field: 'description',
    order: 'ascend'
  }
}

const columns_keys = ['description']

type KindPersonListProps = {}

const ObjectExpertList: React.FC<KindPersonListProps> = () => {
  const permissions = useUserSelector(state => state.permissions)

  const ObjectExpertRef = useRef<ObjectExpertDrawerType>(null)
  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<ObjectExpertType[]>([])
  const [destroy, destroying] = useDestroyObjectExpert()
  const [{ loading }, getObjectExpert] = useGetObjectExpert()

  const fetchObjectExpert = async () => {
    try {
      const { data } = await getObjectExpert()

      if (!data) return

      setData(data)
    } catch (error) {
      messageError('2908201657')
    }
  }

  useEffect(() => {
    fetchObjectExpert()
    // eslint-disable-next-line
  }, [])

  const filtered_data = useMemo(() => filterData({ data: data, filters, columns_keys }), [filters, data])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer = (id: string = '') => {
    ObjectExpertRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const { data } = await destroy(id)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      message.success('Ação/Objeto do processo excluída com sucesso')
      fetchObjectExpert()
    } catch (e) {
      messageError('2908201644')
    }
  }

  const handleTableChange = useCallback((
    pagination: TablePaginationConfig,
    _filter: Record<string, Key[] | null>,
    sorter: any
  ): void => {
    let internal_filters: FiltersType = filters

    if (sorter?.column?.sorter) {
      internal_filters = { ...internal_filters, sort: { order: sorter.order, field: sorter.field } }
    }

    internal_filters = {
      ...internal_filters,
      pagination: {
        current_page: pagination.current || internal_filters!.pagination!.current_page,
        page_size: pagination.pageSize || internal_filters!.pagination!.page_size
      }
    }

    setFilters(internal_filters)
  }, [filters])

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.judicialdistrict.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Ação/Objeto do processo"
        />
      )
    )
  }), [permissions])

  const columns: ColumnsType<ObjectExpertType> = useColumns({
    handleDelete,
    handleEdit: handleOpenDrawer
  })

  const afterSave = () => {
    fetchObjectExpert()
  }

  const exportToXLS = useExportData(filtered_data)

  return (
    <ContainerList>
      <HeaderActions
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        placeholder="Informe a ação/objeto do processo"
        button_text="Nova Ação/Objeto do processo"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.judicialdistrict.create}
        exportToXLS={exportToXLS}
      />

      <ObjectExpertTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroying}
        locale={locale}
      />

      <ObjectExpertDrawer afterSave={afterSave} ref={ObjectExpertRef}/>
    </ContainerList>
  )
}

export default ObjectExpertList
