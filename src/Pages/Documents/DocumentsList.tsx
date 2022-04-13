import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TablePaginationConfig } from 'antd/es/table'
import { Key } from 'antd/lib/table/interface'
import { DocumentType } from './Types'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import HeaderActions from 'Components/MainList/HeaderActions'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import ContainerList from 'Components/MainList/ContainerList'
import useColumns from './useColumns'
import useGetDocuments from './useGetDocuments'
import messageError from 'Utils/messageError'
import DocumentTable from './DocumentTable'
import useDestroyDocument from './useDestroyDocument'
import { message } from 'antd'
import { useNavigate } from 'react-router'
import { useUserSelector } from 'Redux/UserReducer'

const initial_filters: FiltersType = {
  search: '',
  pagination: {
    current_page: 1,
    page_size: 20,
  },
  sort: {
    field: 'createdAt',
    order: 'ascend',
  },
}

const columns_keys = ['title']

const DocumentList: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const navigate = useNavigate()

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<DocumentType[]>([])
  const [{ loading }, getDocuments] = useGetDocuments()
  const [destroyDocument, { loading: destroy_loading }] = useDestroyDocument()

  const loadDocuments = async () => {
    try {
      const response = await getDocuments()
      setData(response.data)
    } catch (error) {
      messageError('202108082112')
    }
  }

  useEffect(() => {
    loadDocuments()
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

  const handleOpenDrawer = useCallback((id?: string) => {
    if (!id) {
      navigate('/document')
      return
    }

    navigate(`/document/${id}`)
  }, [navigate])

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.document.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Documento"
        />
      )
    ),
  }), [handleOpenDrawer, permissions])

  const handleDelete = async (id: string) => {
    try {
      const response = await destroyDocument(id)
      if (response.data.success) {
        message.success('Documento excluído com sucesso')
        setData((prev) => {
          return prev.filter(person => person._id !== id)
        })
      }
    } catch (error) {
      messageError('202108082211')
    }
  }

  const columns = useColumns({ handleDelete, handleEdit: handleOpenDrawer })
  const filtered_data = useMemo(() => filterData({ data, filters, columns_keys }), [filters, data])

  return (
    <ContainerList >
      <HeaderActions
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        placeholder="Informe título do documento"
        button_text="Novo Documento"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.document.create}
      />

      <DocumentTable
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

export default DocumentList
