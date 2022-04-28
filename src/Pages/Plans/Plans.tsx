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

<<<<<<< HEAD
  console.log('data', data);
  console.log('columns', columns);
=======
  // const dataplan = [
  //   users: '1 Usuário',
  // ]
>>>>>>> 3e7736e36f0dc56accaf54e2775eed971f199ca9

  return (
    <Content>
      <Spin spinning={loading || saving}>
        <Container>
          <Header>
            <Text>Mensal</Text>
            <SwitchStyled onChange={(value) => setInternalYearly(value)} checked={internal_yearly} />
            <Text>Anual</Text>
          </Header>

          {/* <StyledCardPlan>
            <p style={{ textAlign: 'center', marginLeft: '30px', marginTop: '20px' }}>
              10 Push Free <br />
              Dashboard <br />
              Gestão de Perícias e Assistências <br />
              Gestão da Agenda <br />
              Cadastros <br />
              Relatórios <br />
            </p>
            {/* <StyledTable
              dataSource={data}
              columns={columns}
              pagination={{
                pageSize: 20,
                hideOnSinglePage: true,
              }}
            /> 
          </StyledCardPlan> */}

          <GridContainer>
            <StyledCardPlan>
<<<<<<< HEAD
              <Bnaaer>
                <h2>START</h2>
              </Bnaaer>
              <ContainerPriceCard>
                <div className="price">
                  R$ {internal_yearly ? '76,40' : '89,90'}
                </div>
                <ul>
                  <li>1 Usuário</li>
                  <li>10 Push Free</li>
                  <li>Dashboard</li>
                  <li>Gestão de Perícias e Assistências</li>
                  <li>Cadastros</li>
                  <li>Gestão da Agenda</li>
                  <li>Relatórios</li>
                </ul>
              </ContainerPriceCard>
              <ButtonStyle onClick={() => handleClickPlan('BASIC')}>
                Contratar
              </ButtonStyle>
=======
              <p style={{ textAlign: 'left', marginTop: '20px', fontSize: '20px', marginLeft: '10%', color: 'white' }}>
                1 Usuário <br />
                10 Push Free <br />
                Dashboard <br />
                Gestão de Perícias e Assistências <br />
                Gestão da Agenda <br />
                Cadastros <br />
                Relatórios <br />
              </p>
              <Button className="buttonstyle">
                Salvar
              </Button>
>>>>>>> 3e7736e36f0dc56accaf54e2775eed971f199ca9
            </StyledCardPlan>
            <StyledCardPlan>
<<<<<<< HEAD
              <Bnaaer>
                <h2>BASIC</h2>
              </Bnaaer>
              <ContainerPriceCard>
                <div className="price">R$ {internal_yearly ? '152,90' : '179,90'}</div>
                <ul>
                  <li>2 usuários</li>
                  <li>20 Push Free</li>
                  <li>Dashboard</li>
                  <li>Gestão de Perícias e Assistências</li>
                  <li>Gestão da Agenda</li>
                  <li>Cadastros</li>
                  <li>Relatórios</li>
                  <li>Gestão de Tarefas</li>
                  <li>Anexo de Arquivos</li>
                </ul>
              </ContainerPriceCard>
              <ButtonStyle onClick={() => handleClickPlan('START')}>
                Contratar
              </ButtonStyle>

            </StyledCardPlan>
            <StyledCardPlan>
              <Bnaaer>
                <h2>PRO</h2>
              </Bnaaer>
              <ContainerPriceCard>
                <div className="price">R$ {internal_yearly ? '229,40' : '269,90'}</div>
                <ul>
                  <li>4 Usuários</li>
                  <li>40 Push Free</li>
                  <li>Dashboard</li>
                  <li>Gestão de Perícias e Assistências</li>
                  <li>Gestão da Agenda</li>
                  <li>Cadastros</li>
                  <li>Relatórios</li>
                  <li>Gestão de Tarefas</li>
                  <li>Anexo de Arquivos</li>
                  <li>Gestão Financeira</li>
                  <li>Gestão de Prazos</li>
                </ul>
                {/* Criação de Documentos "EM BREVE" <br /> */}
              </ContainerPriceCard>
              <ButtonStyle onClick={() => handleClickPlan('PRO')}>
                Contratar
              </ButtonStyle>
=======
              <p style={{ textAlign: 'left', marginTop: '20px', fontSize: '20px', marginLeft: '10%', color: 'white' }}>
                1 Usuário <br />
                10 Push Free <br />
                Dashboard <br />
                Gestão de Perícias e Assistências <br />
                Gestão da Agenda <br />
                Cadastros <br />
                Relatórios <br />
              </p>
              <Button className="buttonstyle">
                Salvar
              </Button>
            </StyledCardPlan>
            <StyledCardPlan>
              <p style={{ textAlign: 'left', marginTop: '20px', fontSize: '20px', marginLeft: '10%', color: 'white' }}>
                1 Usuário <br />
                10 Push Free <br />
                Dashboard <br />
                Gestão de Perícias e Assistências <br />
                Gestão da Agenda <br />
                Cadastros <br />
                Relatórios <br />
              </p>
              <Button className="buttonstyle">
                Salvar
              </Button>
>>>>>>> 3e7736e36f0dc56accaf54e2775eed971f199ca9
            </StyledCardPlan>
          </GridContainer>
        </Container>
      </Spin>

      <PaymentMethodModal ref={PaymentMethodRef} />
    </Content>
  )
}

export default Plans

const Content = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 40px;
  height: calc(100% - 5rem);
`;
const Container = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 40px;
  height: calc(100% - 5rem);
`;
const ContainerPriceCard = styled.div`
  color: #fff;
  padding: 16px;
  text-align: center;
  ul li{
    padding: 8px 0;
    border-bottom: 1px solid #fff;
    list-style: none;
    text-transform: uppercase;
  }
  div.price{
    font-size: 25px;
    font-weight: 900;
    margin-bottom: 12px;
  }
`;

<<<<<<< HEAD
const ButtonStyle = styled.button`
  color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    background-color: transparent;
    background-image: linear-gradient(220deg, #00BED0 30%, #00D9BB 76%);
    border-radius: 25px 25px 25px 25px;
    padding: 10px 25px 10px 25px;
    cursor: pointer;
    border: none;
    width: 150px;
    margin: 0 auto;
    margin-bottom: 14px;
`;

const Bnaaer = styled.div`
  padding: 10px 10px 10px 10px;
  background: #629ab673;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  h2 {
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 800;
    margin: 0;
    align-self: center;
    text-align: center;
  }
`;
=======
// const ButtonStyle = styled.button`

// `;
>>>>>>> 3e7736e36f0dc56accaf54e2775eed971f199ca9

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
<<<<<<< HEAD
  justify-content: center;
  align-items: flex-start;
=======

  .buttonstyle {
    margin-top: 25%;
    margin-left: 5.7%;
    position: absolute;
    padding: 20px 10px;
    width: 10%;
    text-align: center;
    padding-top: 20px;
    border-radius: 10px;
  }
>>>>>>> 3e7736e36f0dc56accaf54e2775eed971f199ca9
`;

const StyledCardPlan = styled.div`  
  display: flex;
  width: 280px;
<<<<<<< HEAD
  background-color: transparent;
  background-image: linear-gradient(180deg, #14DDCA 0%, #00ADB9 100%);
=======
  height: 385px;
  background-color: #36bdc1;
>>>>>>> 3e7736e36f0dc56accaf54e2775eed971f199ca9
  //box-shadow: 0 0px 7px rgba(53, 58, 65, 0.2);
  border-radius: 20px;
  justify-content: space-between;
  transition: box-shadow .3s;
  margin-bottom: 10%;
  flex-direction: column;
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
