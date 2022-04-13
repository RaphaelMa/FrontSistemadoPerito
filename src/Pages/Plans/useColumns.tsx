import React, { memo, useMemo } from 'react'
import { MONTHLY_PRICE, YEARLY_PRICE } from './functions'
import { currencyFormatter } from 'Utils/formatters'
import { Data, PlanContentType } from './types'
import { ColumnsType } from 'antd/es/table'
import { Button } from 'antd'
import styled from 'styled-components'
import { useUserSelector } from 'Redux/UserReducer'

import CheckedIcon from './Assets/checked_icon.svg'
import CancelIcon from './Assets/cancel_icon.svg'

type UseColumns = {
  yearly: boolean,
  handleClickPlan: (plan_name: string) => void
}

const useColumns = ({ yearly, handleClickPlan }: UseColumns): ColumnsType<Data> => {
  return useMemo(() => ([
    {
      title: 'Recursos',
      dataIndex: 'resource',
      ellipsis: true,
      width: 300,
    },
    {
      title: 'START',
      dataIndex: 'start',
      align: 'center',
      render: (plan: PlanContentType) => (
        <RenderComponent
          plan={plan}
          button_text="Contratar"
          button_type="primary"
          plan_key="start"
          onClick={() => handleClickPlan('START')}
          yearly={yearly}
        />
      ),
    },
    {
      title: 'BASIC',
      dataIndex: 'basic',
      align: 'center',
      render: (plan: PlanContentType) => (
        <RenderComponent
          plan={plan}
          button_text="Contratar"
          button_type="primary"
          plan_key="basic"
          onClick={() => handleClickPlan('BASIC')}
          yearly={yearly}
        />
      ),
    },
    {
      title: 'PRO',
      dataIndex: 'pro',
      align: 'center',
      render: (plan: PlanContentType) => (
        <RenderComponent
          plan={plan}
          button_text="Contratar"
          button_type="primary"
          plan_key="pro"
          onClick={() => handleClickPlan('PRO')}
          yearly={yearly}
        />
      ),
    },
    {
      title: 'ENTERPRISE',
      dataIndex: 'enterprise',
      align: 'center',
      ellipsis: true,
      render: (plan: PlanContentType) => (
        <RenderComponent
          plan={plan}
          button_text="Em Breve"
          button_type="default"
          plan_key="enterprise"
          // onClick={() => handleClickPlan('INTERPRISE')}
          onClick={() => console.log('INTERPRISE')}
          yearly={yearly}
        />
      ),
    },
  ]), [handleClickPlan, yearly])
}

export default useColumns

type RenderComponentProps = {
  plan: PlanContentType,
  button_text: 'Contratar' | 'Em Breve',
  button_type: 'primary' | 'default',
  plan_key: 'start' | 'basic' | 'pro' | 'enterprise',
  onClick: () => void
} & Pick<UseColumns, 'yearly'>

const RenderComponent = memo(({ button_text, button_type, plan_key, onClick, plan, yearly }: RenderComponentProps) => {
  const permissions = useUserSelector(state => state.permissions)

  if (typeof plan === 'boolean') return <CheckComponent plan={plan}/>
  if (plan <= 40) return <span>{plan}</span>

  const discount_total = (MONTHLY_PRICE[plan_key] - YEARLY_PRICE[plan_key]) * 12

  return (
    <PriceContainer>
      {yearly && <DashedPrice>{currencyFormatter(MONTHLY_PRICE[plan_key], { cents: true })}</DashedPrice>}

      <Price>{currencyFormatter(plan, { cents: true })}</Price>

      {yearly && (
        <DiscountContainer>
          <Text>Ecomonia de</Text>
          <Text>{currencyFormatter(discount_total, { cents: true })}</Text>
        </DiscountContainer>
      )}

      <ButtonStyled type={button_type} disabled={!permissions?.plan.update} onClick={onClick}>
        {button_text}
      </ButtonStyled>
    </PriceContainer>
  )
})

const CheckComponent = ({ plan }: { plan: boolean }) => (
  plan
    ? <img src={CheckedIcon} alt="checked icon"/>
    : <img src={CancelIcon} alt="cancel icon"/>
)

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`

const Price = styled.h3`
  margin: 0;
`

const DashedPrice = styled.p`
  text-decoration: line-through;
  margin: 0;
`

const DiscountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`

const Text = styled.p`
  margin: 0;
`

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  width: 90%;
`
