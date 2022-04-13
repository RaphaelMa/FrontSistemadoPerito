import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ContainerList from 'Components/MainList/ContainerList'
import HeaderActions from 'Components/MainList/HeaderActions'
import useColumns from './useColumns'
import { MultiCompaniesType } from './types'
import MultiCompaniesTable from './MultiCompaniesTable'
import { TablePaginationConfig } from 'antd/es/table'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { Key } from 'antd/lib/table/interface'
import messageError from 'Utils/messageError'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import { useUserSelector } from 'Redux/UserReducer'
import useGetMultiCompany from 'Pages/MultiCompanies/useGetMultiCompany'
import UnitDrawer, { UnitDrawerType } from 'Components/Drawers/Unit/Unit'
import useDestroyUnit from 'Pages/MultiCompanies/useDestroyUnit'
import { message } from 'antd'

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

const MultiCompanies: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<MultiCompaniesType[]>([])

  const UnitDrawerRef = useRef<UnitDrawerType>(null)
  const [{ loading }, getMultiCompany] = useGetMultiCompany()
  const [destroyUnit, { loading: destroying }] = useDestroyUnit()

  const loadPeople = async () => {
    try {
      const { data } = await getMultiCompany()

      setData(data)
    } catch (error) {
      messageError('2012060138')
    }
  }

  useEffect(() => {
    loadPeople()
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
    UnitDrawerRef.current?.open(id)
  }

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.company.update && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Unidade"
        />
      )
    ),
  }), [permissions])

  const handleDelete = async (id: string) => {
    try {
      const { data } = await destroyUnit(id)
      if (data.success) {
        message.success('Unidade excluída com sucesso')
        setData((prev) => prev.filter(unit => unit._id !== id))
      }
    } catch (error) {
      messageError('2012060220')
    }
  }

  const afterSave = (unit: MultiCompaniesType) => {
    setData(prev => {
      const prev_unit = data.find(p => p._id === unit._id)

      if (prev_unit) {
        const people = prev.filter(p => p._id !== unit._id)

        return [...people, unit]
      }

      return [...prev, unit]
    })
  }

  const columns = useColumns({ handleDelete, handleEdit: handleOpenDrawer })
  const filtered_data = useMemo(() => filterData({ data, filters, columns_keys }), [filters, data])

  return (
    <ContainerList>
      <HeaderActions
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        placeholder="Informe o nome da unidade"
        button_text="Nova Unidade"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.company.update}
      />

      <MultiCompaniesTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroying}
        locale={locale}
      />

      <UnitDrawer ref={UnitDrawerRef} afterSave={afterSave}/>
    </ContainerList>
  )
}

export default MultiCompanies
