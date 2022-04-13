import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import FinancialTable from 'Pages/Financial/FinancialTable'
import useGetProcessFinancial from './useGetProcessFianancial'
import { FinancialType } from 'Pages/Financial/types'
import messageError from 'Utils/messageError'
import styled from 'styled-components'
import { Button, Row } from 'antd'
import { useParams } from 'react-router'
import { currencyFormatter } from 'Utils/formatters'
import MenuTop from 'Pages/NewProcess/MenuTop'
import FinancialDrawer, { FinancialDrawerType } from 'Components/Drawers/Financial/FinancialDrawer'
import { filterData, FiltersType } from 'Utils/functions'
import { TablePaginationConfig } from 'antd/es/table'
import { useUserSelector } from 'Redux/UserReducer'
import PermissionsContainer from 'Components/Permissions/Container'

const initial_filters: FiltersType = {
  pagination: {
    current_page: 1,
    page_size: 20
  },
  sort: {
    field: 'expirationDate',
    order: 'ascend'
  }
}

const FinaceProcess: React.FC = () => {
  const { id } = useParams()

  const permissions = useUserSelector(state => state.permissions)
  const plan_modules = useUserSelector(state => state.company?.plan.modules)

  const financialModalRef = useRef<FinancialDrawerType>(null)

  const [financials, setFinancials] = useState<FinancialType[]>([])
  const [totals, setTotals] = useState({ totalPay: 0, totalReceive: 0 })
  const [filters, setFilters] = useState<FiltersType>(initial_filters)

  const [{ loading }, getFinancials] = useGetProcessFinancial(id)

  const fetchData = async () => {
    if (!plan_modules?.Financial || !permissions?.financial.read) return

    try {
      const { data } = await getFinancials()

      setFinancials(data.message?.dataFinancial || [])
      setTotals({ totalPay: data.message?.totalPay || 0, totalReceive: data.message?.totalReceive || 0 })
    } catch (e) {
      console.log('[FinanceProcess] ', { e })
      messageError('202102271547')
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const handleOpenDrawer: FinancialDrawerType['open'] = (options) => {
    console.log('[FinanceProcess] ', options, id)
    financialModalRef.current?.open(options, id)
  }

  const handleTableChange = useCallback((pagination: TablePaginationConfig, _: any, sorter: any): void => {
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

  const filtered_data = useMemo(() => (
    filterData({ data: financials, filters, columns_keys: [] })
  ), [filters, financials])

  return (
    <PermissionsContainer has_module={plan_modules?.Financial} has_permission={permissions?.financial.read}>
      <Container>
        <MenuTop activePage="financial" id={id}/>

        <Header>
          <Row>
            <Totals $color="#2D8F8A">
              Total Recebido {currencyFormatter(totals.totalReceive, { cents: true })}
            </Totals>

            <Totals $color="#FF4D4F">
              Total Pago {currencyFormatter(totals.totalPay, { cents: true })}
            </Totals>
          </Row>

          <Button type="primary" onClick={() => handleOpenDrawer()}>Nova movimentação</Button>
        </Header>

        <FinancialTable
          loading={loading}
          financials={filtered_data}
          setFinancials={setFinancials}
          handleTableChange={handleTableChange}
          handleOpenDrawer={handleOpenDrawer}
          afterSave={fetchData}
          header_height={96}
        />

        <FinancialDrawer afterSave={fetchData} ref={financialModalRef}/>
      </Container>
    </PermissionsContainer>
  )
}

export default FinaceProcess

const Container = styled.div`
  height: calc(100vh - 5rem);
  padding: 2rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Totals = styled.div<{ $color: string }>`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${p => p.$color};
  color: ${p => p.$color};
  padding: auto;
  margin-right: 5px;
`
