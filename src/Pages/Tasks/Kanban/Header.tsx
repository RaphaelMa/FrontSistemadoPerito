import React, { memo } from 'react'
import { Moment } from 'moment'
import { FiltersType } from './Types'
import { Button, Col, DatePicker, Row, Select } from 'antd'
import { TaskModalType } from 'Components/Modals/TaskModal/TaskModal'
import { TaskColumnModalType } from 'Components/Modals/TaskColumn/TaskColumnModal'
import ProcessInput from 'Components/Inputs/ProcessInput/ProcessInput'
import UserInput from 'Components/Inputs/UserInput/UserInput'
import styled from 'styled-components'
import TaskColumnInput from 'Components/Inputs/TaskColumn/TaskColumnInput'
import { Link } from 'react-router-dom'
import ExcelIcon from 'Components/ExcelIcon'

type Props = {
  openTaskModal?: TaskModalType['open'],
  openColumnModal?: TaskColumnModalType['open'],
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>,
  type: 'kanban' | 'list',
  exportToXLS?: () => void,
}

const Header: React.FC<Props> = ({ openTaskModal, openColumnModal, setFilters, type, exportToXLS }) => {
  const onChangeDate = (values?: [Moment | null, Moment | null] | null) => {
    setFilters((prev) => ({ ...prev, start_date: values?.[0]?.format('YYYY-MM-DD'), end_date: values?.[1]?.format('YYYY-MM-DD') }))
  }

  const onProcessChange = (process_id?: string) => {
    setFilters((prev) => ({ ...prev, process_id }))
  }

  const onUserChange = (user_id?: string) => {
    setFilters((prev) => ({ ...prev, user_id }))
  }

  const onChangeFinished = (finished?: string) => {
    if (finished === 'false') {
      setFilters((prev) => ({ ...prev, finished: false }))
      return
    }

    if (finished === 'true') {
      setFilters((prev) => ({ ...prev, finished: true }))
      return
    }

    setFilters((prev) => ({ ...prev, finished: undefined }))
  }

  const onChangeColumn = (column_id?: string) => {
    setFilters((prev) => ({ ...prev, column_id }))
  }

  return (
    <Container>
      <Row gutter={8} style={{ width: '100%' }}>
        <Col span={4}>
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            onChange={onChangeDate}
            format="DD/MM/YYYY"
            allowEmpty={[true, true]}
          />
        </Col>

        <Col span={4}>
          <UserInput onChange={onUserChange} allowClear/>
        </Col>

        <Col span={3}>
          <ProcessInput onProcessChange={onProcessChange} allowClear/>
        </Col>

        <Col span={3}>
          <TaskColumnInput onChange={onChangeColumn} allowClear />
        </Col>

        <Col span={2}>
          <Select
            placeholder="Finalizado"
            style={{ width: '100%' }}
            allowClear
            // @ts-ignore
            onChange={onChangeFinished}
          >
            <Select.Option key="true" value="true">
              Sim
            </Select.Option>

            <Select.Option key="false" value="false">
              Não
            </Select.Option>
          </Select>
        </Col>

        <ButtonsWrapper span={8}>
          {type === 'list' && (
            <Button onClick={exportToXLS}>
              <ExcelIcon />
            </Button>
          )}

          <Button block type="primary" onClick={() => openTaskModal?.()}>Nova Tarefa</Button>

          <Button block type="primary" onClick={() => openColumnModal?.()}>Nova Coluna</Button>

          <Button block>
            <Link to={type === 'kanban' ? '/tasks-list' : '/tasks'}>
              {type === 'kanban' ? 'Ver lista' : 'Ver kanban'}
            </Link>
          </Button>
        </ButtonsWrapper>
      </Row>
    </Container>
  )
}

export default memo(Header)

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  padding: 10px 10px 0 10px;
  gap: 10px;
`

const ButtonsWrapper = styled(Col)`
  display: flex;
  flex-direction: row;
  gap: 8px;
`
