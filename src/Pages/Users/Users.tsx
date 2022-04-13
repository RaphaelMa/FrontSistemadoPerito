import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ContainerList from 'Components/MainList/ContainerList'
import HeaderActions from 'Components/MainList/HeaderActions'
import UsersTable from './UsersTable'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useColumns from './useColumns'
import useGetUsers from './useGetUsers'
import messageError from 'Utils/messageError'
import useDestroyUser from './useDestroyUser'
import { useNavigate } from 'react-router-dom'
import { UserType } from './types'
import { TablePaginationConfig } from 'antd/es/table'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { Key } from 'antd/lib/table/interface'
import { useUserSelector } from 'Redux/UserReducer'
import { message } from 'antd'

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

const columns_keys = ['name']

const Users: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)
  const kindUser = useUserSelector(state => state.kindUser)


  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<UserType[]>([])
  const [{ loading }, getUsers] = useGetUsers()
  const [destroyUser, { loading: destroy_loading }] = useDestroyUser()
  const navigate = useNavigate()

  const loadUsers = async () => {
    try {
      const response = await getUsers()
      setData(response.data)
    } catch (error) {
      messageError('202023080130')
    }
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line
  }, [])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenUser = useCallback((id?: string) => {
    if (id) {
      navigate(`/user/${id}`)
      return
    }

    navigate('/user')
  }, [navigate])

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
      permissions?.user.create && (
        <EmptyComponent
          onClick={() => handleOpenUser()}
          action_text="Usuário"
        />
      )
    ),
  }), [handleOpenUser, permissions])

  const handleDelete = async (id: string) => {
    try {
      const response = await destroyUser(id)
      if (response.data.success) {
        message.success('Usuário excluído com sucesso')
        setData((prev) => prev.filter(user => user._id !== id))
      }
    } catch (error) {
      messageError('202008262002')
    }
  }

  const filtered_data = useMemo(() => filterData({ data, filters, columns_keys }), [filters, data])
  const columns = useColumns({ handleDelete, handleEdit: handleOpenUser })

  return (
    <ContainerList>
      {kindUser?.kindUser_key === 'admin' && (
        <HeaderActions
          onPressEnter={onPressEnter}
          setFilters={setFilters}
          placeholder="Informe nome do usuário"
          button_text="Novo Usuário"
          handleNew={handleOpenUser}
          has_create_permission={permissions?.user.create}
        />
      )}

      <UsersTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroy_loading}
        locale={locale}
      />
    </ContainerList>
  )
}

export default Users