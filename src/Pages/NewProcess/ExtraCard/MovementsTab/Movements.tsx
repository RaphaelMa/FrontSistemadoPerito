import React, { useMemo, useState, useRef } from 'react'
import { DatePicker, Input, Row, Col } from 'antd'
import { MovementType } from './types'
import MovimentsTable from './MovementsTable'
import moment, { Moment } from 'moment'
import Fuse from 'fuse.js'

type Props = {
  movements?: MovementType[]
}

const FUSE_OPTIONS = {
  threshold: 0.4,
  isCaseSensitive: false,
  findAllMatches: true,
  keys: ['description'],
}

const Movements: React.FC<Props> = ({ movements }) => {
  const searchDelay = useRef<number | null>(null)

  const [start_date, setStartDate] = useState<Moment | null>(null)
  const [end_date, setEndDate] = useState<Moment | null>(null)
  const [search, setSearch] = useState<string>()

  const filter_by_date = useMemo(() => (
    movements?.filter(movement => {
      if (!start_date || !end_date || !movement?.movementDate) return true

      const date = moment(movement.movementDate, 'YYYY-MM-DD')
      return date.isBetween(start_date, end_date) || date.isSame(start_date) || date.isSame(end_date)
    })
  ), [end_date, movements, start_date])

  const filtered_movements = useMemo(() => {
    if (!search || !filter_by_date) return filter_by_date

    const fuse = new Fuse(filter_by_date, FUSE_OPTIONS)
    return fuse.search(search).map(item => item.item)
  }, [filter_by_date, search])

  return (
    <>
      <Row gutter={8} style={{ marginBottom: '10px' }}>
        <Col flex="1 0 305">
          <DatePicker.RangePicker
            format="DD/MM/YYYY"
            onChange={(values) => {
              setStartDate(values?.[0]?.startOf('day') || null)
              setEndDate(values?.[1]?.startOf('day') || null)
            }}
          />
        </Col>
        <Col flex="1">
          <Input
            onChange={(event) => {
              const value = event.target.value
              if (searchDelay.current) clearTimeout(searchDelay.current)

              searchDelay.current = setTimeout(() => setSearch(value), 300)
            }}
            placeholder="Procure pela descrição"
          />
        </Col>
      </Row>
      <MovimentsTable movements={filtered_movements}/>
    </>
  )
}

export default Movements
