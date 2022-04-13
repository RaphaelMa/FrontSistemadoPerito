import React, { memo } from 'react'
import { Select, Col, Row, Form } from 'antd'
import moment, { Moment } from 'moment'
import { capitalize } from 'Utils/formatters'
import styled from 'styled-components'
import UserInput from 'Components/Inputs/UserInput/UserInput'
import DeadLineInput from 'Components/Inputs/DeadLineInput/DeadLine'
import SearchInput from 'Components/Inputs/SearchInput'
import { debounce } from 'lodash'
import { removeFalsyValues } from '../../Utils/functions'
import { FiltersType } from './Schedule'

const { Option } = Select

type HeaderProps = {
  value: Moment,
  onChange: (date: Moment) => void,
  setFilters: React.Dispatch<React.SetStateAction<FiltersType | null>>,
}

const YEARS = 10 // quantidade de anos a mais e a menos pro input

const Header: React.FC<HeaderProps> = ({ value, onChange, setFilters }) => {
  const [form] = Form.useForm<FiltersType>()

  const months: Moment[] = []

  for (let i = 0; i < 12; i++) {
    months.push(moment().month(i))
  }

  const year = value.year()

  const years = []

  for (let i = year - YEARS; i < year + YEARS; i += 1) {
    years.push(i)
  }

  const handleFormChange = (values: FiltersType) => {
    setFilters(removeFalsyValues(values) as FiltersType)
  }

  return (
    <Form
      form={form}
      onValuesChange={debounce((value, values) => handleFormChange(values), 400)}
      initialValues={{ processNumber: '' }}
      component={false}
    >
      <Container>
        <Row gutter={8}>
          <Col>
            <Select
              size="middle"
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              onChange={(newYear: number) => {
                const now = value.clone().year(newYear)
                onChange(now)
              }}
              getPopupContainer={(trigger) => trigger.parentNode}
              value={year}
            >
              {years.map(year => (
                <Option key={year} value={year} className="year-item">
                  {year}
                </Option>
              ))}
            </Select>
          </Col>

          <Col>
            <Select
              size="middle"
              dropdownMatchSelectWidth={false}
              value={value.month()}
              getPopupContainer={(trigger) => trigger.parentNode}
              onChange={(selected_month) => {
                const new_value = value.clone()
                new_value.month(selected_month)
                onChange(new_value)
              }}
            >
              {months.map((month, index) => (
                <Option key={index} value={index} className="year-item">
                  {capitalize(month.format('MMM'))}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={4}>
            <Form.Item noStyle name="expertName">
              <UserInput allowClear value_key="name" placeholder="Perito ou Assistente"/>
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item noStyle name="deadLineDescription">
              <DeadLineInput allowClear value_key="description"/>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item noStyle name="processNumber">
              <SearchInput placeholder="Procure pelo nº do processo"/>
            </Form.Item>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default memo(Header)

const Container = styled.div`
  padding: 8px 0;
`
