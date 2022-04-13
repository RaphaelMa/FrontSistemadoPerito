import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import ContainerList from 'Components/MainList/ContainerList'
import HeaderActions from 'Components/MainList/HeaderActions'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { PersonKindType } from './types'
import KindPersonTable from './PersonKindTable'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useColumns from './useColumns'
import { Key } from 'antd/lib/table/interface'
import useGetPersonKind from './useGetPersonKind'
import messageError from 'Utils/messageError'
import PersonKindDrawer, { PersonKindDrawerType } from 'Components/Drawers/PersonKind/PersonKind'
import useDestroyPersonKind from 'Pages/PersonKind/useDestroyPersonKind'
import { message } from 'antd'
import { useUserSelector } from 'Redux/UserReducer'
import useExportData from './useExportData'

const initial_filters: FiltersType = {
  search: '',
  pagination: {
    current_page: 1,
    page_size: 10,
  },
  sort: {
    field: 'description',
    order: 'ascend',
  },
}

const columns_keys = ['description']

type KindPersonListProps = {}

const PersonKindList: React.FC<KindPersonListProps> = () => {
  const permissions = useUserSelector(state => state.permissions)

  const PersonKindRef = useRef<PersonKindDrawerType>(null)
  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [people, setPeople] = useState<PersonKindType[]>([])
  const [destroyPersonKind, destroying] = useDestroyPersonKind()
  const [{ loading }, getPeopleKind] = useGetPersonKind()

  const fetchPeopleKind = async () => {
    try {
      const { data } = await getPeopleKind()
      setPeople(data)
    } catch (error) {
      messageError('2508202310')
    }
  }

  useEffect(() => {
    fetchPeopleKind()
    // eslint-disable-next-line
  }, [])

  const filtered_data = useMemo(() => filterData({ data: people, filters, columns_keys }), [filters, people])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer = (id?: string) => {
    PersonKindRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const { data } = await destroyPersonKind(id)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      message.success('Tipo de pessoa excluída com sucesso')
      fetchPeopleKind()
    } catch (e) {
      messageError('2608202053')
    }
  }

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

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.kindPeople.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Tipo de Pessoa"
        />
      )
    ),
  }), [permissions])

  const columns: ColumnsType<PersonKindType> = useColumns({ destroying, handleDelete, handleEdit: handleOpenDrawer })

  const afterSave = () => {
    fetchPeopleKind()
  }

  const exportToXLS = useExportData(filtered_data)

  return (
    <ContainerList>
      <HeaderActions
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        placeholder="Informe o tipo de pessoa"
        button_text="Novo Tipo"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.kindPeople.create}
        exportToXLS={exportToXLS}
      />

      <KindPersonTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading}
        locale={locale}
      />

      <PersonKindDrawer afterSave={afterSave} ref={PersonKindRef}/>
    </ContainerList>
  )
}

export default PersonKindList
