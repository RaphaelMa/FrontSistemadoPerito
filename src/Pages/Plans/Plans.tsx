import React, { useEffect, useRef, useState } from 'react'
import { buildData, MONTHLY_PRICE, YEARLY_PRICE } from './functions'
import { message, Spin, Switch, Table } from 'antd'
import { useUserDispatch, useUserSelector } from 'Redux/UserReducer'
import { Plan } from './types'
import PaymentMethodModal, { ScheduleModalType } from 'Components/Modals/PaymentMethod/PaymentMethodModal'
import messageError from 'Utils/messageError'
import useGetPlans from './useGetPlans'
import styled from 'styled-components'
import useColumns from './useColumns'
import useSaveCompany from 'Pages/Company/useSaveCompany'
import successModal from 'Utils/successModal'
import { useNavigate } from 'react-router-dom'

const Plans: React.FC = () => {
  const company = useUserSelector(state => state.company)

  const annual = !!company?.plan?.annual
  const [internal_yearly, setInternalYearly] = useState(annual)
  const [plans, setPlans] = useState<Plan[]>([])

  const [saveCompany, { loading: saving }] = useSaveCompany()
  const [{ loading }, getPlans] = useGetPlans()
  const PaymentMethodRef = useRef<ScheduleModalType>(null)
  const dispatch = useUserDispatch()
  const navigate = useNavigate()

  const handleSaveCompany = async (plan_id: string) => {
    try {
      const values = { ...company, plan_id, annual: internal_yearly }
      const { data } = await saveCompany(values as any)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      dispatch({ type: 'UPDATE_COMPANY', payload: data.company })

      successModal({
        content: 'Plano escolhido com sucesso',
        duration: 4000,
        onEndDuration: () => navigate('/'),
      })
    } catch (_e) {
      messageError('2011142222')
    }
  }

  const handleClickPlan = (plan_name: string) => {
    const plan = plans.find(plan => plan.name === plan_name)

    if (!company?.toHire) {
      PaymentMethodRef.current?.open({ plan: { _id: plan!._id, annual: internal_yearly } })
      return
    }

    handleSaveCompany(plan!._id)
  }

  const fetchPlans = async () => {
    try {
      const { data } = await getPlans()

      if (!data.success) {
        message.error(data.message)
        return
      }

      setPlans(data.plans)
    } catch (e) {
      messageError('2011051928')
    }
  }

  useEffect(() => {
    fetchPlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = buildData({ prices: internal_yearly ? YEARLY_PRICE : MONTHLY_PRICE })
  const columns = useColumns({ yearly: internal_yearly, handleClickPlan })

  return (
    <>
      <Spin spinning={loading || saving}>
        <Container>
          <Header>
            <Text>Mensal</Text>
            <SwitchStyled onChange={(value) => setInternalYearly(value)} checked={internal_yearly}/>
            <Text>Anual</Text>
          </Header>

          <StyledTable
            dataSource={data}
            columns={columns}
            pagination={{
              pageSize: 20,
              hideOnSinglePage: true,
            }}
          />
        </Container>
      </Spin>

      <PaymentMethodModal ref={PaymentMethodRef}/>
    </>
  )
}

export default Plans

const Container = styled.div`
  padding: 0 15%;
  height: 100%;
  overflow-y: auto;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
`

const Text = styled.p`
  margin: 0;
`

const SwitchStyled = styled(Switch)`
  margin: 0 10px;
`

const StyledTable = styled(Table)`
  .ant-table-thead {
    th {
      border-bottom: 2px solid ${p => p.theme.colors.dark_gray};
      padding: 5px 0;
      background: white;
    }
  }

  .ant-table-body {
    height: 100%;
  }

  .ant-table-body, .ant-table-row {
    td {
      padding: 1.5px 0;
      border-bottom: unset;
    }

    :nth-last-child(2) td {
      padding-bottom: 5px;
      border-bottom: 2px solid ${p => p.theme.colors.dark_gray};
    }
  }
` as typeof Table
