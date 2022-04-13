import React, { memo } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Divider } from 'antd'
import { FiltersType, IndicatorsType } from './types'
import UserInput from 'Components/Inputs/UserInput/UserInput'
import DeadLineInput from 'Components/Inputs/DeadLineInput/DeadLine'
import ProcessSituation from 'Components/Inputs/ProcessSituationInput/ProcessSituationInput'
import ProcessFinancialSituationInput
  from 'Components/Inputs/ProcessFinnacialSituationInput/ProcessFinancialSituationInput'
import ProcessInput from 'Components/Inputs/ProcessInput/ProcessInput'

type Props = {
  indicators?: IndicatorsType,
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
}

const Header: React.FC<Props> = ({ indicators, setFilters }) => {
  return (
    <>
      <Container>
        <Item $color="#3CA49E">
          <div>
            Faltam 20 Dias<br/>
            Para o Fim do Prazo
          </div>

          <div>
            {indicators?.countTwentyDays || 0}
          </div>
        </Item>

        <Item $color="#FE9111">
          <div>
            Faltam 15 Dias<br/>
            Para o Fim do Prazo
          </div>

          <div>
            {indicators?.countFifteenDays || 0}
          </div>
        </Item>

        <Item $color="#FAAD14">
          <div>
            Faltam 10 Dias<br/>
            Para o Fim do Prazo
          </div>

          <div>
            {indicators?.countTenDays || 0}
          </div>
        </Item>

        <Item $color="#eb5353">
          <div>
            Faltam 5 Dias<br/>
            Para o Fim do Prazo
          </div>

          <div>
            {indicators?.countFiveDays || 0}
          </div>
        </Item>

        <Item $color="#F00C0C">
          <div>
            Passou do<br/>
            Prazo de Entrega
          </div>

          <div>
            {indicators?.countOverDue || 0}
          </div>
        </Item>

        <Item $color="#3CA49E">
          <div>
            Prazos Concluídos
          </div>

          <div>
            {indicators?.countDone || 0}
          </div>
        </Item>
      </Container>

      <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }}/>

      <Container>
        <DeadLineInput
          style={{ width: '19%' }}
          placeholder="Tipo de Prazo"
          allowClear
          mode="multiple"
          onChange={(_, options) => {
            // @ts-ignore
            const deadlines = options?.map(option => option.description)

            setFilters(prev => ({ ...prev, deadlines }))
          }}
        />

        <UserInput
          style={{ width: '19%' }}
          allowClear
          placeholder="Perito ou Assistente"
          mode="multiple"
          onChange={(_, options) => {
            // @ts-ignore
            const expert_names = options?.map(option => option.name)

            setFilters(prev => ({ ...prev, expert_names }))
          }}
        />

        <ProcessFinancialSituationInput
          style={{ width: '19%' }}
          placeholder="Situação Financeira do Processo"
          allowClear
          mode="multiple"
          onChange={(_, options) => {
            // @ts-ignore
            const descriptions = options?.map(option => option.description)

            setFilters(prev => ({ ...prev, financial_situations: descriptions }))
          }}
        />

        <ProcessSituation
          style={{ width: '19%' }}
          placeholder="Situação do Processo"
          allowClear
          mode="multiple"
          onChange={(_, options) => {
            // @ts-ignore
            const descriptions = options?.map(option => option.description)

            setFilters(prev => ({ ...prev, situation_descriptions: descriptions }))
          }}
        />

        <ProcessInput
          style={{ width: '19%' }}
          placeholder="Procure pelo nº do processo"
          allowClear
          onChange={(_, options) => {
            // @ts-ignore
            const number = options?.number

            setFilters(prev => ({ ...prev, processNumber: number }))
          }}
        />
      </Container>
    </>
  )
}

export default memo(Header)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  .ant-select-selector {
    flex-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Item = styled.div<{ $color: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${p => lighten(0.45, p.$color)};
  border: 1px solid ${p => p.$color};
  color: ${p => p.$color};
  text-align: center;
  border-radius: 5px;
  padding: 1rem;

  div + div {
    font-size: 30px;
  }
`
