import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { TablePaginationConfig } from 'antd/es/table'
import { Key } from 'antd/lib/table/interface'
import { Account } from './types'
import { message } from 'antd'
import AccountDrawer, { FinanceAccountDrawerType } from 'Components/Drawers/FinanceAccount/FinanceAccountDrawer'
import EmptyComponent from 'Components/EmptyComponent/EmptyComponent'
import useDestroyAccount from './useDestroyAccount'
import HeaderActions from 'Components/MainList/HeaderActions'
import ContainerList from 'Components/MainList/ContainerList'
import useGetAccounts from './useGetAccounts'
import AccountTable from './AccountTable'
import messageError from 'Utils/messageError'
import useColumns from './useColumns'
import useExportData from './useExportData'

const initial_filters: FiltersType = {
  search: '',
  pagination: {
    current_page: 1,
    page_size: 20
  },
  sort: {
    field: 'description',
    order: 'ascend'
  }
}

const columns_keys = ['description']

const Accounts: React.FC = () => {
  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [data, setData] = useState<Account[]>([])
  const AccountDrawerRef = useRef<FinanceAccountDrawerType>(null)
  const [{ loading }, getAccounts] = useGetAccounts()
  const [destroyAccount, { loading: destroy_loading }] = useDestroyAccount()

  const loadAccounts = async () => {
    try {
      const response = await getAccounts()
      setData(response.data)
    } catch (error) {
      messageError('202130051643')
    }
  }

  useEffect(() => {
    loadAccounts()
    // eslint-disable-next-line
  }, [])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

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

  const handleOpenDrawer = (id?: string) => {
    AccountDrawerRef.current?.open(id)
  }

  const locale = useMemo(() => ({
    emptyText: (
      <EmptyComponent
        onClick={() => handleOpenDrawer()}
        action_text="Conta Financeira"
      />
    )
  }), [])


  const handleDelete = async (id: string) => {
    try {
      const response = await destroyAccount(id)
      if (response.data.success) {
        message.success('Conta financeira excluída com sucesso!')
        setData((prev) => prev.filter(person => person._id !== id))
      }
    } catch (error) {
      messageError('202105161946')
    }
  }

  const afterSave = (account: Account) => {
    setData(prev => {
      const prev_account = data.find(p => p._id === account._id)

      if (prev_account) {
        const old_account = prev.filter(p => p._id !== account._id)

        return [...old_account, account]
      }

      return [...prev, account]
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
        placeholder="Informe o nome da conta"
        button_text="Nova Conta"
        handleNew={handleOpenDrawer}
        has_create_permission={true}
        exportToXLS={exportToXLS}
      />

      <AccountTable
        columns={columns}
        filtered_data={filtered_data}
        filters={filters}
        handleTableChange={handleTableChange}
        loading={loading || destroy_loading}
        locale={locale}
      />

      <AccountDrawer afterSave={afterSave} ref={AccountDrawerRef}/>
    </ContainerList>
  )
}

export default Accounts
