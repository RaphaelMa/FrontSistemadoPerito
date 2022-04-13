import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TablePaginationConfig } from 'antd/es/table'
import { Key } from 'antd/lib/table/interface'
import { PersonType } from './types'
import PeopleTable from 'Pages/People/PeopleTable'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import HeaderActions from 'Components/MainList/HeaderActions'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import ContainerList from 'Components/MainList/ContainerList'
import useColumns from 'Pages/People/useColumns'
import PersonDrawer, { PersonDrawerType } from 'Components/Drawers/Person/Person'
import useGetPeople from './useGetPeople'
import messageError from 'Utils/messageError'
import useDestroyPerson from './useDestroyPerson'
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
    field: 'name',
    order: 'ascend',
  },
}

const columns_keys = ['name', 'businessEmail', 'personalEmail', 'document']

const PeopleList: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<PersonType[]>([])
  const PersonDrawerRef = useRef<PersonDrawerType>(null)
  const [{ loading }, getPeople] = useGetPeople()
  const [destroyPeople, { loading: destroy_loading }] = useDestroyPerson()

  const loadPeople = async () => {
    try {
      const response = await getPeople()
      setData(response.data.people)
    } catch (error) {
      messageError('202023080130')
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
    PersonDrawerRef.current?.open(id)
  }

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.people.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Pessoa"
        />
      )
    ),
  }), [permissions])


  const handleDelete = async (id: string) => {
    try {
      const response = await destroyPeople(id)
      if (response.data.success) {
        message.success('Pessoa excluída com sucesso')
        setData((prev) => {
          return prev.filter(person => person._id !== id)
        })
      }
    } catch (error) {
      messageError('202008252102')
    }
  }

  const afterSave = (person: PersonType) => {
    setData(prev => {
      const prev_person = data.find(p => p._id === person._id)

      if (prev_person) {
        const people = prev.filter(p => p._id !== person._id)

        return [...people, person]
      }

      return [...prev, person]
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
        placeholder="Informe nome, n° do documento ou e-mail"
        button_text="Nova Pessoa"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.people.create}
        exportToXLS={exportToXLS}
      />

      <PeopleTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroy_loading}
        locale={locale}
      />
      <PersonDrawer afterSave={afterSave} ref={PersonDrawerRef}/>
    </ContainerList>
  )
}

export default PeopleList
