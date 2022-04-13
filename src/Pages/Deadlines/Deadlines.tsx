import React, { useRef, useState, useCallback, useMemo } from 'react'
import DeadlineModal, { DeadlineModalType } from 'Components/Modals/Deadline/DeadlineModal'
import { DeadlineType, FiltersType } from './types'
import useGetDeadlines from './useGetDeadlines'
import styled from 'styled-components'
import useColumns from './useColumns'
import Header from './Header'
import Table from './Table'

const DeadLines: React.FC = () => {
  const [filters, setFilters] = useState<FiltersType>({
    expert_names: [],
    deadlines: [],
    situation_descriptions: [],
    financial_situations: [],
  })

  const deadlineModalRef = useRef<DeadlineModalType>(null)

  const [{ loading, data }] = useGetDeadlines()

  const filterItems = useCallback((items: DeadlineType[] = []) => {
    const { expert_names, deadlines, situation_descriptions, financial_situations, processNumber } = filters

    return items.filter(item => {
      if (expert_names.length > 0 && !expert_names.includes(item.expertName)) return false
      if (deadlines.length > 0  && !deadlines.includes(item.deadeLine_description)) return false
      if (situation_descriptions.length > 0 && !situation_descriptions.includes(item.situation_description)) return false
      if (financial_situations.length > 0 && !financial_situations.includes(item.financialSituation_description)) return false
      if (processNumber && !item.processNumber.includes(processNumber)) return false

      return true
    })
  }, [filters])

  const openDeadlineModal = useCallback((id: string) => {
    deadlineModalRef.current?.open(id)
  }, [])

  const filtered_overdue = useMemo(() => filterItems(data?.arrayOverDue), [data, filterItems])
  console.log('OVERDUE =>', filtered_overdue)
  const filtered_five_days = useMemo(() => filterItems(data?.arrayFiveDays), [data, filterItems])
  console.log('5 DIAS =>', filtered_five_days);
  console.log('RETORNO DATA =>', data);
  const filtered_ten_days = useMemo(() => filterItems(data?.arrayTenDays), [data, filterItems])
  const filtered_fifteen_days = useMemo(() => filterItems(data?.arrayFifteenDays), [data, filterItems])
  const filtered_twenty_days = useMemo(() => filterItems(data?.arrayTwentyDays), [data, filterItems])
  const filtered_done = useMemo(() => filterItems(data?.arrayDone), [data, filterItems])

  const common_columns = useColumns({ openDeadlineModal })
  const done_columns = useColumns({ openDeadlineModal, type: 'done' })
  const overdue_columns = useColumns({ openDeadlineModal, type: 'overdue' })

  return (
    <Container>
      <Header indicators={data?.indicators} setFilters={setFilters}/>

      <Table
        loading={loading}
        title="Passou do Prazo de Entrega"
        title_color="#F00C0C"
        data={filtered_overdue}
        columns={overdue_columns}
      />

      <Table
        loading={loading}
        title="Faltam 5 Dias Para o Fim do Prazo"
        title_color="#eb5353"
        data={filtered_five_days}
        columns={common_columns}
      />

      <Table
        loading={loading}
        title="Faltam 10 Dias Para o Fim do Prazo"
        title_color="#FAAD14"
        data={filtered_ten_days}
        columns={common_columns}
      />

      <Table
        loading={loading}
        title="Faltam 15 Dias Para o Fim do Prazo"
        title_color="#FE9111"
        data={filtered_fifteen_days}
        columns={common_columns}
      />

      <Table
        loading={loading}
        title="Faltam 20 Dias Para o Fim do Prazo"
        title_color="#3CA49E"
        data={filtered_twenty_days}
        columns={common_columns}
      />

      <Table
        loading={loading}
        title="Prazos Concluídos"
        title_color="#3CA49E"
        data={filtered_done}
        columns={done_columns}
      />

      <DeadlineModal ref={deadlineModalRef}/>
    </Container>
  )
}

export default DeadLines

const Container = styled.div`
  padding: 2rem;
  height: calc(100vh - 5rem);
  overflow: auto;
`
