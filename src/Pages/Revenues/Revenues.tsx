import React, { useEffect, useState } from 'react'
import { BillingType, PartialMonthly } from './types'
import styled from 'styled-components'
import RevenueTable from './RevenueTable'
import Boleto from 'Assets/boleto.png'
import { Button, Spin, Tooltip } from 'antd'
import { currencyFormatter } from 'Utils/formatters'
import useColumns from './useColumns'
import useGetBillings from 'Pages/Revenues/useGetBillings'
import messageError from 'Utils/messageError'

const Revenues: React.FC = () => {
  const [billings, setBillings] = useState<BillingType[]>([])
  const [partial_monthly, setPartialMonthly] = useState<PartialMonthly | null>(null)

  const [{ loading }, getBillings] = useGetBillings()

  const getData = async () => {
    try {
      const { data } = await getBillings()

      setBillings(data.billing)
      setPartialMonthly(data.partialMonthly)
    } catch (error) {
      messageError('202008252245')
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = useColumns()

  return (
    <Spin spinning={loading}>
      <Container>
        <InformationContainer>
          <InformationCard>
            <Title>Valor parcial da mensalidade</Title>
            <Period>{partial_monthly?.period}</Period>

            <Price>{currencyFormatter(partial_monthly?.valueTotal)}</Price>

            <DescriptionContainer>
              {partial_monthly?.arrayDescription.map((description) => (
                <Description key={description}>{description}</Description>
              ))}
            </DescriptionContainer>
          </InformationCard>

          <PaymentCard>
            <Image src={Boleto}/>

            <Tooltip title="Em breve no sistema">
              <PaymentButton disabled type="primary">Alterar Forma de Pagamento</PaymentButton>
            </Tooltip>
          </PaymentCard>
        </InformationContainer>

        <RevenueTable
          data={billings}
          columns={columns}
        />
      </Container>
    </Spin>
  )
}

export default Revenues

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: calc(100% - 5rem);
  padding: 1rem;
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  height: 90%;
  margin-right: 1rem;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${p => p.theme.colors.light_gray};
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const InformationCard = styled(Card)`
  min-height: 220px;
  height: calc(100vh - 210px);
  margin-bottom: 1rem;
`

const PaymentCard = styled(Card)`
  height: 40%;
`

const Image = styled.img`
  width: 100px;
  height: 65px;
`

const PaymentButton = styled(Button)`
  margin-top: 1rem;
`

const Price = styled.h1`
  font-weight: 550;
`

const Title = styled.h2`
  margin: 0;
`

const Period = styled.h2`
  margin: 0;
`

const DescriptionContainer = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 247px;
  overflow-y: auto;
  list-style-type: none;
`

const Description = styled.li`
  display: flex;
  justify-content: center;
`
