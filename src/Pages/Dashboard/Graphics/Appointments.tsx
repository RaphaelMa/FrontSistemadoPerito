import React from 'react'
import { DonutChart } from "bizcharts";

type AppointmentDataType = {
  total: number,
  percent: number
}

export type AppointmentsType = {
  acceptAppointmentYes: AppointmentDataType,
  acceptAppointmentNot: AppointmentDataType
}

type Props = {
  data: AppointmentsType
}

// const COLORS = {
//   Sim: '#40afa3',
//   Não: '#373543',
// }

const Appointments: React.FC<Props> = ({ data: raw_data }) => {
  let total_value = 0
  const data = Object.entries(raw_data || {}).map(([key, value]) => {
    total_value += value.total
    if (key === 'acceptAppointmentYes') return { type: 'Sim', value: value.total }

    return { type: 'Não', value: value.total }
  })

  const show_tooltip = total_value > 1

  return (
    <DonutChart
      data={data || []}
      forceFit
      radius={0.8}
      padding="auto"
      angleField="value"
      colorField="type"
      pieStyle={{ stroke: "white", lineWidth: 0 }}
      statistic={{ visible: true, totalLabel: 'Total' }}
      label={{ visible: false }}
      legend={{ visible: true, position: 'left-center' }}
      tooltip={{ visible: show_tooltip, showTitle: false }}
    />
  )
}

export default Appointments
