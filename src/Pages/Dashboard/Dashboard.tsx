import React, { useEffect } from 'react'
import Graphics from './Graphics/Index'
import styled from 'styled-components'
import useGetData from './useGetData'
import Header from './Header'

const Dashboard = () => {
  const [{ data, loading }, fetchData] = useGetData()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dashboard_data = data?.dashboard

  return (
    <Container>
      <Header
        total_process={dashboard_data?.totalProcess}
        process_monitoring={dashboard_data?.processMonitoring}
        honorary_value={dashboard_data?.honoraryValue}
        process_expert_date={dashboard_data?.processExpertDate || 0}
      />
      <Graphics
        loading={loading}
        appointments={dashboard_data?.acceptAppointment}
        process_situation={dashboard_data?.situation}
        financial_situation={dashboard_data?.financialSituation}
      />
    </Container>
  )
}

export default Dashboard

const Container = styled.div`
  overflow-x: auto;
  height: calc(100vh - 5rem);
  user-select: none;
  padding-bottom: 20px;
`
