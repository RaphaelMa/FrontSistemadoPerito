import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TablePaginationConfig } from 'antd/es/table'
import HeaderActions from 'Components/MainList/HeaderActions'
import ContainerList from 'Components/MainList/ContainerList'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import Table from './KeywordTable'
import useColumns from './useColumns'
import { KeywordType } from './types'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useGetKeywords from './useGetKeywords'
import messageError from 'Utils/messageError'
import KeywordDrawer, { KeywordDrawerRefType } from 'Components/Drawers/Keyword/Keyword'
import useDestroyKeyword from './useDestroyKeyword'
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

const KeyWordList: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<KeywordType[]>([])
  const [{ loading }, getKeywords] = useGetKeywords()
  const [destroyKeyword, { loading: destroy_loading }] = useDestroyKeyword()
  const keywordDrawerRef = useRef<KeywordDrawerRefType>(null)

  const loadKeywords = async () => {
    try {
      const response = await getKeywords()
      setData(response.data)
    } catch (error) {
      messageError('202008252245')
    }
  }

  useEffect(() => {
    loadKeywords()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer = (id?: string) => {
    keywordDrawerRef.current?.open(id)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await destroyKeyword(id)
      if (response.data.success) {
        message.success('Palavra chave excluída com sucesso')
        setData((prev) => prev.filter(keyword => keyword._id !== id))
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
    console.log('[KeywordList] ', internal_filters)
    setFilters(internal_filters)
  }, [filters])

  const locale = useMemo(() => ({
    emptyText: (
      permissions?.keyWord.create && (
        <EmptyComponent
          onClick={() => handleOpenDrawer()}
          action_text="Palavra Chave"
        />
      )
    ),
  }), [permissions])

  const afterSave = (keyword: KeywordType) => {
    setData(prev => {
      const prev_keyword = data.find(key => key._id === keyword._id)

      if (prev_keyword) {
        const keywords = prev.filter(key => key._id !== keyword._id)

        return [...keywords, keyword]
      }

      return [...prev, keyword]
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
        placeholder="Informe palavra chave"
        button_text="Nova Palavra"
        handleNew={handleOpenDrawer}
        has_create_permission={permissions?.keyWord.create}
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
      <KeywordDrawer ref={keywordDrawerRef} afterSave={afterSave}/>
    </ContainerList>
  )
}

export default KeyWordList
