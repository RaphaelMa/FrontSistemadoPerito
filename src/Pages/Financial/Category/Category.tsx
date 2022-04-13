import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import HeaderActions from 'Components/MainList/HeaderActions'
import ContainerList from 'Components/MainList/ContainerList'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import CategoryTable from './CategoryTable'
import { TablePaginationConfig } from 'antd/es/table'
import { Key } from 'antd/lib/table/interface'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { useUserSelector } from 'Redux/UserReducer'
import { CategoryType } from './types'
import { message } from 'antd'
import CategoryDrawer, { CategoryDrawerType } from 'Components/Drawers/FincanceCategory/Category'
import useGetCategories from './useGetCategories'
import useDestroyCategory from './useDestroyCategory'
import useColumns from './useColumns'
import messageError from 'Utils/messageError'
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

const Category: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const categoryDrawerRef = useRef<CategoryDrawerType>(null)

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<CategoryType[]>([])

  const [{ loading }, getCategories] = useGetCategories()
  const [destroyCategory, { loading: destroy_loading }] = useDestroyCategory()

  const loadCategories = async () => {
    try {
      const response = await getCategories()
      setData(response.data)
    } catch (error) {
      messageError('202012301431')
    }
  }

  useEffect(() => {
    loadCategories()
    // eslint-disable-next-line
  }, [])

  const handleOpenDrawer = (id?: string) => {
    categoryDrawerRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await destroyCategory(id)
      if (response.data.success) {
        message.success('Categoria excluída com sucesso')
        setData((prev) => {
          return prev.filter(category => category._id !== id)
        })
      }
    } catch (error) {
      messageError('202012301443')
    }
  }

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

  const afterSave = (category: CategoryType) => {
    setData(prev => {
      const prev_category = data.find(c => c._id === category._id)

      if (prev_category) {
        const categories = prev.filter(c => c._id !== category._id)

        return [...categories, category]
      }

      return [...prev, category]
    })
  }

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.financial.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Categoria"
        />
      )
    ),
  }), [permissions])

  const columns = useColumns({ handleDelete, handleEdit: handleOpenDrawer })
  const filtered_data = useMemo(() => filterData({ data, filters, columns_keys }), [filters, data])

  const exportToXLS = useExportData(filtered_data)

  return (
    <ContainerList>
      <HeaderActions
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        placeholder="Informe nome"
        button_text="Nova Categoria"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.financial.create}
        exportToXLS={exportToXLS}
      />

      <CategoryTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroy_loading}
        locale={locale}
      />
      <CategoryDrawer ref={categoryDrawerRef} afterSave={afterSave}/>
    </ContainerList>
  )
}

export default Category
