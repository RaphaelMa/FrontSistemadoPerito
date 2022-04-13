import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Axis, Chart, Coord, Geom, Tooltip } from 'bizcharts'
import { currencyFormatter } from 'Utils/formatters'
import useGetProcessIndicators from './useGetProcessIndicators'
import { Empty, Spin } from 'antd'
import messageError from 'Utils/messageError'

type SituationType = {
  description: string,
  totalHonorary: number,
  totalProcess: number,
}

type Props = {
  type: 'situation' | 'financial-situation'
}

const Situation: React.FC<Props> = ({ type }) => {

  const [{ data, loading }, getData] = useGetProcessIndicators<SituationType>()

  const loadData = async () => {
    try {
      await getData(type)
    } catch (error) {
      messageError('202103071554')
    }
  }

  useEffect(() => {
    loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const situations = data?.message || []

  const cols = {}

  return (
    <>
      {type === 'situation'
        ? (
          <div>
            <h2>Indicador Situação do Processo</h2>

            <span>Este indicador informa o valor total dos honorários e o total de processos para cada situação</span>
          </div>
        ) : (
          <div>
            <h2>Indicador Situação Financeira do Processo</h2>

            <span>Este indicador informa o valor total dos honorários e o total de processos para cada situação financeira</span>
          </div>
        )
      }

      <Spin spinning={loading}>
        <GraphContainer>
          {situations.length === 0
            ? (
              <Empty description="Nenhum indicador encontrado" />
            ) : (
              <Chart
                height="100%"
                data={situations}
                scale={cols}
                padding="auto"
                appendPadding={[0, 180, 0, 0]}
                autoFit
              >
                <Coord transpose />
                <Axis name="description" />
                <Axis name="totalHonorary" visible={false} />
                <Tooltip>
                  {(title, items) => <CustomTooltip title={title} items={items}/>}
                </Tooltip>
                <Geom
                  color="description"
                  type="interval"
                  position="description*totalHonorary"
                  label={['totalHonorary*totalProcess', (value, process) => {
                    return ({ content: `${currencyFormatter(value, { cents: true })} | Processos: ${process}` })
                  }]}
                >
                </Geom>
              </Chart>
            )
          }
        </GraphContainer>
      </Spin>
    </>
  )
}

export default Situation

const GraphContainer = styled.div`
  height: calc(100vh - 5rem - 65.5px - 60px);
  margin-top: 20px;
  border: 1px solid ${p => p.theme.colors.primary};
  padding: 10px;
`

type CustomTooltipProps = {
  title?: string,
  items?: any[],
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ title, items }) => {
  return (
    <div style={{ padding: 10 }}>
      <div>
        {title}
      </div>

      {items?.map((item, index) => (
        <div key={index}>
          <TooltipItem $color={item.color}>
            Processos: {item.data.totalProcess}
          </TooltipItem>

          <TooltipItem $color={item.color}>
            Honorários: {currencyFormatter(item.data.totalHonorary, { cents: true })}
          </TooltipItem>
        </div>
      ))}
    </div>
  )
}

const TooltipItem = styled.div<{ $color: string }>`
  margin-top: 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${p => p.$color};
    margin-right: 5px;
  }
`
