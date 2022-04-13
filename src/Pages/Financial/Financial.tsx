import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { filterData, FiltersType, scapeRegex } from 'Utils/functions'
import { TablePaginationConfig } from 'antd/es/table'
import { Key } from 'antd/lib/table/interface'
import styled from 'styled-components'
import moment, { defaultFormat, Moment } from 'moment'
import { Form, message } from 'antd'
import { FinancialType, GeneralFinancial } from './types'
import { Store } from 'antd/lib/form/interface'
import FinancialDrawer, { FinancialDrawerType } from 'Components/Drawers/Financial/FinancialDrawer'
import messageError from 'Utils/messageError'
import useGetFinancial from './useGetFinancial'
import FinancialTable from './FinancialTable'
import Header from './Header'
import useExportData from './useExportData'

type InternalFiltersType = {
  start_date: Moment,
  end_date: Moment,
  isPaid?: boolean,
  movement_description?: string,
  financialAccount_id?: string
}

const initial_filters: FiltersType = {
  search: '',
  pagination: {
    current_page: 1,
    page_size: 20
  },
  sort: {
    field: 'expirationDate',
    order: 'ascend'
  }
}

export const initial_headers_filters: InternalFiltersType = {
  start_date: moment().startOf('month'),
  end_date: moment().endOf('month'),
  isPaid: undefined,
  movement_description: undefined,
  financialAccount_id: undefined
}

const columns_keys = ['process_number', 'people_name', 'category_description']

const initial_general_financial = {
  total: 0,
  receive: 0,
  pay: 0
}

const Financial: React.FC = () => {
  const [general_financial, setGeneralFinancial] = useState<GeneralFinancial>(initial_general_financial)
  const [header_filters, setHeaderFilters] = useState<InternalFiltersType>(initial_headers_filters)
  const [filters, setFilters] = useState<FiltersType>(initial_filters)
  const [financials, setFinancials] = useState<FinancialType[]>([])
  const [header_key, setHeaderKey] = useState('')

  const [form] = Form.useForm()

  const financialModalRef = useRef<FinancialDrawerType>(null)

  const [{ loading }, getFinancial] = useGetFinancial()

  const fetchData = async () => {
    try {
      const { data } = await getFinancial()

      if (!data.success) {
        message.error(data.message)
        return
      }

      setFinancials(data.financial)
      setGeneralFinancial(data.generalFinancial)
    } catch (e) {
      messageError('202012191938')
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const onPressEnter = useCallback((value: string) => {
    setFilters((old_filters) => ({ ...old_filters, search: scapeRegex(value) }))
  }, [])

  const handleOpenDrawer: FinancialDrawerType['open'] = (options) => {
    financialModalRef.current?.open(options)
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

    setFilters((old_filters) => ({ ...old_filters, ...internal_filters }))
  }, [filters])

  const handleFormChange = (changedFields: Store[]) => {
    if (!changedFields.length) return

    const field = changedFields[0]
    let value = field.value

    if (field.name[0] === 'isPaid' && typeof field.value === 'string') {
      value = field.value === 'true'
    }

    setHeaderFilters(old_filters => ({ ...old_filters, [field.name]: value }))
  }

  const afterSave = (data?: { financial: FinancialType, generalFinancial: GeneralFinancial }) => {
    setHeaderKey(String(Math.floor(Math.random() * 100)))

    if (!data) return

    const { financial, generalFinancial } = data
    setFinancials(prev => {
      const prev_financial = prev.find(f => f._id === financial._id)

      if (prev_financial) {
        const financials = prev.filter(f => f._id !== financial._id)

        return [...financials, financial]
      }

      return [...prev, financial]
    })

    setGeneralFinancial(generalFinancial)
  }

  const filtered_data_by_header_filters = useMemo(() => {
    const { start_date, end_date, isPaid, movement_description, financialAccount_id } = header_filters

    return financials.filter(movement => {
      let has_filter = true

      if (typeof isPaid === 'boolean') {
        has_filter = movement.isPaid === isPaid
      }

      if (!has_filter) return false

      if (typeof financialAccount_id === 'string') {
        has_filter = movement.financialAccount_id === financialAccount_id
      }

      if (!has_filter) return false

      if (typeof movement_description === 'string') {
        has_filter = movement.movement_description === movement_description
      }

      if (!has_filter) return false

      return moment(movement?.expirationDate, defaultFormat).isBetween(start_date, end_date, 'days', '[]')
    })
  }, [header_filters, financials])

  const filtered_data = useMemo(() => (
    filterData({ data: filtered_data_by_header_filters, filters, columns_keys })
  ), [filters, filtered_data_by_header_filters])

  const exportToXLS = useExportData(filtered_data)

  return (
    <Container>
      <Header
        key={header_key}
        general_financial={general_financial}
        handleFormChange={handleFormChange}
        form={form}
        onPressEnter={onPressEnter}
        setFilters={setFilters}
        handleOpenDrawer={handleOpenDrawer}
        exportToXLS={exportToXLS}
      />

      <FinancialTable
        loading={loading}
        financials={filtered_data}
        setFinancials={setFinancials}
        setGeneralFinancial={setGeneralFinancial}
        handleTableChange={handleTableChange}
        handleOpenDrawer={handleOpenDrawer}
        afterSave={afterSave}
        header_height={124.797}
      />

      <FinancialDrawer afterSave={afterSave} ref={financialModalRef}/>
    </Container>
  )
}

export default Financial

const Container = styled.div`
  width: 100%;
  padding: 2rem;
  height: calc(100vh - 4rem);
`
