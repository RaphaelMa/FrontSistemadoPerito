import React from 'react'
import { DonutChart } from "bizcharts"

export type FinancialSituationType = {
  description: string,
  total: number,
  percent: number,
}

type Props = {
  data: FinancialSituationType[]
}

// const COLORS = {
//   'Aguardando': '#8a00fe',
//   'Requerer Pagamento Honorários': '#f10202',
//   'Rquerer Lavantamento de Honorários': '#f0e001',
//   'Aguardando Sentença': '#49cf52',
//   'Aguard. Pagamento de Honorários': '#f36500',
//   'À Receber': '#49c1cd',
//   'Propor Execução': '#9f57ff',
//   'Req. Certidão Execução': '#f3645b',
//   'Em Execução': '#ecf702',
//   '50% + SUC': '#52e487',
//   'Cancelado': '#f6a602',
//   'Recebido': '#6dd5dd',
// }

const DEFAULT_DATA = [
  { description: 'Aguardando', total: 0 },
  { description: 'Em Execução', total: 0 },
  { description: 'Aguardando Sentença', total: 0 },
  { description: 'Cancelado', total: 0 },
  { description: 'Recebido', total: 0 },
]

const FinancialSituation: React.FC<Props> = ({ data: raw_data }) => {
  const data = raw_data?.length === 0 ? DEFAULT_DATA : raw_data
  const show_tooltip = raw_data?.length > 0

  return (
    <DonutChart
      data={data || []}
      forceFit
      radius={0.8}
      padding="auto"
      angleField="total"
      colorField="description"
      pieStyle={{ stroke: "white", lineWidth: 0 }}
      statistic={{ visible: true, totalLabel: 'Total' }}
      label={{ visible: false }}
      legend={{ visible: true, position: 'left-center' }}
      tooltip={{ visible: show_tooltip, showTitle: false }}
    />
  )
}

export default FinancialSituation
