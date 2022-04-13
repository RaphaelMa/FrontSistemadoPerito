import React, { memo } from 'react'
import { DatePicker, Row, Col, Select } from 'antd'
import { HistoryType, ChangedFiltersType } from './types'
import { isEqual } from 'lodash'
import UserInput from 'Components/Inputs/UserInput/UserInput'
import styled from 'styled-components'

type Props = {
  handleChangeFilters: (type: ChangedFiltersType, value: string | (string | undefined)[]) => void,
  modules: HistoryType['module'][],
  actions: HistoryType['action'][],
}

const Header: React.FC<Props> = ({ modules, actions, handleChangeFilters }) => {
  const handleChangeDate = (values: any) => {
    if (!values) return handleChangeFilters('dates', [])

    const start_date = values[0]
    const end_date = values[1]

    handleChangeFilters('dates', [start_date?.format('YYYY-MM-DDT00:00'), end_date?.format('YYYY-MM-DDT23:59:59.999Z')])
  }

  const handleChangeUser = (value: string) => {
    handleChangeFilters('user_id', value)
  }

  const handleChangeModule = (value: string) => {
    handleChangeFilters('module_id', value)
  }

  const handleChangeAction = (value: string) => {
    handleChangeFilters('action_id', value)
  }

  return (
    <StyledRow gutter={16}>
      <Col span={5}>
        <RangePicker
          style={{ width: '100%' }}
          onChange={handleChangeDate}
          format="DD/MM/YYYY"
        />
      </Col>
      <Col span={3}>
        <Select
          allowClear
          placeholder="Ação"
          onChange={handleChangeAction}
          style={{ width: '100%' }}
        >
          {actions.map(action => (
            <Select.Option key={action.action_id} value={action.action_id}>
              {action.action_name}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={3}>
        <Select
          allowClear
          placeholder="Módulo"
          onChange={handleChangeModule}
          style={{ width: '100%' }}
        >
          {modules.map(module => (
            <Select.Option key={module.module_id} value={module.module_id}>
              {module.module_name}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={3}>
        <UserInput
          allowClear
          placeholder="Usuário"
          onChange={handleChangeUser}
        />
      </Col>
    </StyledRow>
  )
}

export default memo(Header, isEqual)

const StyledRow = styled(Row)`
  margin-bottom: 3rem;
`

const RangePicker = styled(DatePicker.RangePicker)`
  width: 100%;
  input {
    text-align: center;
  }
`
