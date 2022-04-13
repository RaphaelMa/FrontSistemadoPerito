import React from 'react'
import styled from 'styled-components'
import Appointments, { AppointmentsType } from './Appointments'
import ProcessSituation, { ProcessSituationType } from './ProcessSituation'
import FinancialSituation, { FinancialSituationType } from './FinancialSituation'
import { MainContainer } from '../Header'
import { Card } from 'antd'

type Props = {
  loading: boolean,
  appointments: AppointmentsType,
  process_situation: ProcessSituationType[]
  financial_situation: FinancialSituationType[]
}

const Index: React.FC<Props> = ({ loading, appointments, process_situation, financial_situation }) => {
  return (
    <MainContainer>
      <StyledCard size="small" title="Aceitou nomeação">
        <Appointments data={appointments}/>
      </StyledCard>
      <StyledCard size="small" title="Situação do processo">
        <ProcessSituation data={process_situation}/>
      </StyledCard>
      <StyledCard size="small" title="Situação financeira do processo">
        <FinancialSituation data={financial_situation}/>
      </StyledCard>
    </MainContainer>
  )
}

export default Index

const StyledCard = styled(Card)`
  width: 31%;
  margin: auto;
  box-shadow: 0 0px 7px rgba(53, 58, 65, 0.2);
  border-radius: 5px;

  .ant-card-head {
    text-align: center;
    font-size: 1.4em;
  }
`
