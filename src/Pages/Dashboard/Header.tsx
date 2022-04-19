import React from 'react';
import styled from 'styled-components';
import law_image from './images/processos.png';
import push_image from './images/push.png';
import { Link } from 'react-router-dom'
//import money_image from './images/honorarios.png';
import search_icon from './images/pericias.png';
import { IndicatorsType } from '../Deadlines/types';
// import { currencyFormatter } from 'Utils/formatters';
import { Card } from 'antd'

type Props = {
  total_process: number,
  process_monitoring: number,
  honorary_value: number,
  process_expert_date: number,
  indicators?: IndicatorsType,

}

const Header: React.FC<Props> = ({ total_process, indicators, process_monitoring, honorary_value, process_expert_date }) => {

  return (
    <MainContainer>
      <StyledCard>
        <Link style={{ display: 'flex' }} to="/process-list">

          <div className="icon">
            <Icon src={law_image} alt="Total de processos" />
          </div>
        </Link>

        <div className="info">
          <div className="title">Processos</div>
          {total_process}
        </div>

      </StyledCard>
      <StyledCard>
        <div className="icon">
          <Icon src={push_image} alt="Push ativos" />
        </div>
        <div className="info">
          <div className="title">Push ativos</div>
          {process_monitoring}
        </div>
      </StyledCard>
      {/* <StyledCard>
        <div className="icon">
          <Icon src={money_image} alt="Honorários"/>
        </div>
        <div className="info">
          <div className="title">Prazos 5 Dias </div>
            {JSON.stringify(indicators?.countFiveDays)}
        </div>
      </StyledCard> */}
      <StyledCard>
        <Link to="/schedule">
          <div className="icon">
            <Icon src={search_icon} alt="Perícias do dia" />
          </div>
        </Link>
        <div className="info">
          <div className="title">Perícias do dia</div>
          {process_expert_date}
        </div>
      </StyledCard>
    </MainContainer>
  )
}

export default Header

export const MainContainer = styled.div`
  width: calc(100% - 20px);
  margin: 10px;
  padding: 1% 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${p => p.theme.colors.dark_gray};
`

export const StyledCard = styled(Card)`
  min-width: 32%;
  max-width: 32%;
  margin: auto;
  display: flex;
  //box-shadow: 0 0px 7px rgba(53, 58, 65, 0.2);
  border-radius: 5px;
  transition: box-shadow .3s;

  .ant-card-body {
    display: flex;
    width: 100%;
  }

  .info {
    flex: 1;
    text-align: end;
    font-size: 1.4em;

    .title {
      font-size: 1.2em;
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0px 10px #1793ae7e; 
  }
`;

const Icon = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`
