import React from 'react'
import { DonutChart } from "bizcharts"

export type ProcessSituationType = {
  description: string,
  total: number,
  percent: number,
}

type Props = {
  data: ProcessSituationType[]
}

// const COLORS = {
//   'Não deferido': '#40afa3',
//   'Declinado': '#373543',
//   'Arquivado': '#f0e001',
//   'Aguardando deferimento de honorários': '#f36500',
//   'Laudo após Deposito dos Hon.': '#49c1cd',
//   'Aguardando Pericia': '#9f57ff',
//   'Aguardando quesitos': '#f3645b',
//   'Protocolar Laudo': '#6dd5dd',
//   'Protocolado Laudo': '#c3adff',
//   'Pericia cancelada': '#f9d38a',
//   'Ausência das Partes': '#ade9ec',
//   'Concluído': '#efecff'
// }

const DEFAULT_DATA = [
  { description: 'Não deferido', total: 0 },
  { description: 'Declinado', total: 0 },
  { description: 'Arquivado', total: 0 },
  { description: 'Aguardando Pericia', total: 0 },
  { description: 'Protocolar Laudo', total: 0 },
  { description: 'Ausência das Partes', total: 0 },
  { description: 'Concluído', total: 0 },
]

const Appointments: React.FC<Props> = ({ data: raw_data }) => {
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

export default Appointments
