import React, { useEffect, useRef, useState } from 'react'
import { buildData, MONTHLY_PRICE, YEARLY_PRICE } from './functions'
import { message, Spin, Switch, Table, Button } from 'antd'
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

  // const dataplan = [
  //   users: '1 Usuário',
  // ]

  return (
    <>
      <Spin spinning={loading || saving}>
        <Container>
          <Header>
            <Text>Mensal</Text>
            <SwitchStyled onChange={(value) => setInternalYearly(value)} checked={internal_yearly} />
            <Text>Anual</Text>
          </Header>
          <GridContainer>

            {/* <StyledTable
            dataSource={data}
            columns={columns}
            pagination={{
              pageSize: 20,
              hideOnSinglePage: true,
            }}
          />  */}

            <StyledCardPlan>
              <Bnaaer>
                <h2>START</h2>
              </Bnaaer>
              <p style={{ textAlign: 'left', marginTop: '50px', fontSize: '15px', marginLeft: '10%', color: 'white' }}>
                1 Usuário <br />
                10 Push Free <br />
                Dashboard <br />
                Gestão de Perícias e Assistências <br />
                Gestão da Agenda <br />
                Cadastros <br />
                Relatórios <br />
              </p>
              <ButtonStyle type="submit">
                Contratar
              </ButtonStyle>
            </StyledCardPlan>

            <StyledCardPlan>
              <Bnaaer>
                <h2>BASIC</h2>
              </Bnaaer>
              <p style={{ textAlign: 'left', marginTop: '50px', fontSize: '15px', marginLeft: '10%', color: 'white' }}>
                2 Usuários <br />
                20 Push Free <br />
                Dashboard <br />
                Gestão de Perícias e Assistências <br />
                Gestão da Agenda <br />
                Cadastros <br />
                Relatórios <br />
                Gestão de Tarefas <br />
                Anexo de Arquivos <br />
              </p>
              <ButtonStyle type="submit">
                Contratar
              </ButtonStyle>

            </StyledCardPlan>
            <StyledCardPlan>
              <Bnaaer>
                <h2>PRO</h2>
              </Bnaaer>
              <p style={{ textAlign: 'left', marginTop: '50px', fontSize: '15px', marginLeft: '10%', color: 'white' }}>
                4 Usuários <br />
                40 Push Free <br />
                Dashboard <br />
                Gestão de Perícias e Assistências <br />
                Gestão da Agenda <br />
                Cadastros <br />
                Relatórios <br />
                Gestão de Tarefas <br />
                Anexo de Arquivos <br />
                Gestão Financeira <br />
                Gestão de Prazos <br />
                Criação de Documentos "EM BREVE" <br />
              </p>
              <ButtonStyle type="submit">
                Contratar
              </ButtonStyle>
            </StyledCardPlan>
          </GridContainer>
        </Container>
      </Spin>

      <PaymentMethodModal ref={PaymentMethodRef} />
    </>
  )
}

export default Plans

const Container = styled.div`
  padding: 0 15%;
  height: 100%;
  overflow-y: auto;
`;

const ButtonStyle = styled.button`
  display: inline;
  position: absolute;
  margin-top: 28%;
  width: 20%;
  height: 30px; 
  color: white;

  background-color: #3CA49E;
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none;
  border-radius: 10px;

  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    width: 20%;
    height: 31px;
  }
`;

const Bnaaer = styled.div`
  width: 19.8%;
  margin-top: 1px;
  border-radius: 8px;
  height: 40px;
  position: absolute;
  color: white;
  background-color: #3CA49E;

  h2 {
    color: white;
    text-align: center;
  }
`;

const GridContainer = styled.div` 
  /* margin-left: 20%; */
  display: grid;
  height: 100%;
  align-content: center;
  align-items: center;
  grid-template-columns: auto auto auto;
  gap: 10px;
  background-color: white;
  padding: 10px;
`;

const StyledCardPlan = styled.div`  
  display: flex !important;
  width: 280px;
  height: 385px;
  background-color: #36bdc1;
  //box-shadow: 0 0px 7px rgba(53, 58, 65, 0.2);
  border-radius: 10px;
  justify-content: space-between;
  transition: box-shadow .3s;
  margin-bottom: 10%;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0px 30px #1793ae7e;
  }
`;

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
