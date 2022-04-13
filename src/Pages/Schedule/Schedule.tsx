import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Badge, Calendar, message, Spin } from 'antd'
import { Month, Status, Content } from './types'
import ScheduleModal, { ScheduleModalType } from 'Components/Modals/Schedule/ScheduleModal'
import useGetScheduleData from 'Pages/Schedule/useGetScheduleData'
import moment, { defaultFormat, Moment } from 'moment'
import styled from 'styled-components'
import Header from './Header'
import { lighten } from 'polished'
import { normalizeString } from '../../Utils/functions'

const NORMALIZED_STATUS: Status = {
  'Aguardando': 'warning',
  'Realizado': 'success',
  'Cancelado': 'error'
}

export type FiltersType = {
  processNumber: string,
  expertName: string,
  deadLineDescription: string
}

const Schedule: React.FC = () => {
  const [raw_data, setRawData] = useState<Month[]>([])
  const [month_data_filtered, setMonthDataFiltered] = useState<Month[]>([])
  const [filters, setFilters] = useState<FiltersType | null>(null)
  const [date, setDate] = useState<Moment | undefined>(undefined)

  const [loading, getScheduleDates] = useGetScheduleData()

  const scheduleModalRef = useRef<ScheduleModalType>(null)

  const fetchData = useCallback(async (date: Moment) => {
    try {
      const { data } = await getScheduleDates(date)

      // const fake_content: Content[] = []
      //
      // for (let i = 0; i < 10; i++) {
      //   fake_content.push(
      //     {
      //       _id: String('5fce890b67015423f347885d' + i),
      //       hour: '14:00',
      //       status: i % 2 === 0 ? 'Aguardando' : i % 3 === 0 ? 'Cancelado' : 'Realizado',
      //       color: i % 2 === 0 ? '#497208' : i % 3 === 0 ? '#FF6347' : '#5E12DC',
      //       processNumber: '745896321547',
      //       expertName: i % 2 === 0 ? 'Gustavo afwqfnpw' : 'Adriel',
      //       expertiseDate: '2020-12-07T16:56:59.000Z',
      //       place: 'Clínica com o ome maior pra testar',
      //       deadLineDescription: i % 2 === 0 ? 'Perícia' : i % 3 === 0 ? 'Laudo' : 'Esc. Laudo'
      //     }
      //   )
      // }
      //
      // let fake_data: Month[] | [] = data.month.map((month, index) => ({
      //   ...month,
      //   content: index % 3 === 0 ? fake_content : []
      // }))
      //
      if (!data) return
      // setRawData(fake_data)
      setRawData(data.month)
      setDate(date)
    } catch (e) {
      message.error('Não foi possível carregar os dias do mês. Recarregue a página e tente novamente. ' +
        'Se persistir o erro entre em contato conosco pelo código: 2008202138')
    }
  }, [getScheduleDates])

  const loadData = () => {
    const raw_date = window.localStorage.getItem('schedule_date')

    if (!raw_date) {
      fetchData(moment())
      return
    }

    try {
      const date_moment = moment(JSON.parse(raw_date), defaultFormat)
      fetchData(date_moment)
    } catch (e) {
      console.log(e)
      fetchData(moment())
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (date) {
      window.localStorage.setItem('schedule_date', JSON.stringify(date.format(defaultFormat)))
    }
  }, [date])

  useEffect(() => {
    setMonthDataFiltered(raw_data)
  }, [raw_data])

  const filterContent = useCallback((content: Content[]) => {
    const filters_typed = filters as FiltersType

    return (
      content.filter(content => (
        Object.keys(filters_typed).reduce((acc: Boolean, key) => {
          if (key === 'deadLineDescription') {
            return (acc && content[key] === filters_typed[key])
          }

          const content_normalized = normalizeString(content[key as keyof FiltersType] || '')
          const filter_content_normalized = normalizeString(filters_typed[key as keyof FiltersType])

          return (acc && content_normalized.includes(filter_content_normalized))
        }, true)
      ))
    )
  }, [filters])

  const handleFilters = useCallback(() => {
    const data_filtered = raw_data.map(day => ({
      ...day,
      content: filterContent(day.content)
    }))

    setMonthDataFiltered(data_filtered)
  }, [filterContent, raw_data])

  useEffect(() => {
    if (filters) {
      handleFilters()
    }
  }, [filters, handleFilters])

  const handleProcess = useCallback((id: string) => {
    scheduleModalRef.current?.open(id)
  }, [])

  const dateCellRender = useCallback((date: Moment) => {
    if (!month_data_filtered.length) return []

    const format_date = moment(date, defaultFormat).format('YYYY-MM-DD')

    const content = month_data_filtered.find(month => (
      moment(month?.date, defaultFormat).format('YYYY-MM-DD') === format_date)
    )?.content

    return (
      <ul className="events">
        {(content || []).map((process, index) => {
          const process_text = `${process.deadLineDescription} - ${process.hour} ${process.processNumber} ${process.expertName || ''}`

          return (
            <LiStyled
              key={index}
              $color={process.color}
              title={process_text}
              onClick={() => handleProcess(process._id)}
            >
              <Process
                style={{ paddingLeft: 3 }}
                $color={process.color}
                status={NORMALIZED_STATUS[process.status]}
                text={process_text}
              />
            </LiStyled>
          )
        })}
      </ul>
    )
  }, [month_data_filtered, handleProcess])

  const onPanelChange = useCallback((date: Moment) => {
    fetchData(date)
    setDate(date)
  }, [fetchData])

  const headerRender = useCallback(({ value, onChange }: { value: Moment, onChange: (date: Moment) => void }) => (
    <Header
      value={value}
      onChange={onChange}
      setFilters={setFilters}
    />
  ), [setFilters])

  const afterSave = useCallback(() => {
    fetchData(moment())
  }, [fetchData])

  return (
    <Container>
      <Spin spinning={loading}>
        <CalendarStyled
          fullscreen={true}
          dateCellRender={dateCellRender}
          onPanelChange={onPanelChange}
          value={date}
          headerRender={headerRender}
          mode="month"
        />
      </Spin>

      <ScheduleModal afterSave={afterSave} ref={scheduleModalRef}/>
    </Container>
  )
}

export default Schedule

const Container = styled.div`
  padding: 1rem;
  overflow-x: auto;
  height: calc(100vh - 5rem);
  user-select: none;
`

type ProcessType = {
  $color: string,
}

const LiStyled = styled.li<ProcessType>`
  line-height: 16px !important;
  color: ${(p: ProcessType) => p.$color} !important;
`

// @ts-ignore
const Process = styled<ProcessType>(Badge)`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(p: ProcessType) => lighten(0.7, p.$color)};
  border-radius: 3px;
  border: 1px solid ${(p: ProcessType) => p.$color};

  .ant-badge-status-text {
    color: ${(p: ProcessType) => p.$color};
    margin-left: 3px;
  }
`

const CalendarStyled = styled(Calendar)`
  .ant-picker-cell, .ant-picker-cell-in-view {
    cursor: auto;
  }

  .ant-picker-calendar-date-content {
    height: unset !important;
    min-height: 80px;
  }

  tr, td {
    vertical-align: top;
  }

  .ant-picker-calendar-date-value {
    display: flex;
  }
`
