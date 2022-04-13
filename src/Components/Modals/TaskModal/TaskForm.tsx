import React, { memo } from 'react'
import { TaskFormType } from './Types'
import { Row, Col, Form, Input, DatePicker, Switch } from 'antd'
import ProcessInput from 'Components/Inputs/ProcessInput/ProcessInput'
import UserInput from 'Components/Inputs/UserInput/UserInput'
import styled from 'styled-components'
import moment from 'moment'
import TaskColumnInput from 'Components/Inputs/TaskColumn/TaskColumnInput'

type Props = {
  setFieldsValue: (values: Partial<TaskFormType>) => void
}

const TaskForm: React.FC<Props> = ({ setFieldsValue }) => {
  const onUserChange = (_id: string, user: any) => {
    setFieldsValue({ user_name: user.name })
  }

  const onProcessChange = (_id: string, process: any) => {
    setFieldsValue({ process_number: process.processNumber })
  }

  const onColumnChange = (_id: string, options: any) => {
    setFieldsValue({ column_description: options?.description })
  }

  const onFinishedChange = (finished: boolean) => {
    if (finished) {
      setFieldsValue({ finishedDate: moment().utc() })
      return
    }

    setFieldsValue({ finishedDate: undefined })
  }

  return (
    <Row gutter={8}>
      <Col span={12}>
        <Form.Item name="_id" noStyle>
          <Input type="hidden"/>
        </Form.Item>
        <Form.Item name="title" label="Título">
          <Input placeholder="Título"/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="column_description" noStyle>
          <Input type="hidden"/>
        </Form.Item>
        <Form.Item name="column_id" label="Coluna" rules={[{ required: true, message: 'Campo obrigatório' }]}>
          <TaskColumnInput onChange={onColumnChange} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="process_number" noStyle>
          <Input type="hidden"/>
        </Form.Item>
        <Form.Item name="process_id" label="Processo">
          <ProcessInput onProcessChange={onProcessChange}/>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="user_name" noStyle>
          <Input type="hidden"/>
        </Form.Item>
        <Form.Item name="user_id" label="Responsável">
          <UserInput onChange={onUserChange}/>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="description" label="Descrição" rules={[{ required: true, whitespace: true, message: 'Campo obrigatório' }]}>
          <Input.TextArea placeholder="Adiciona a descrição" autoSize={{ minRows: 3 }} maxLength={500}/>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="createAt" label="Data Criação">
          <DatePicker
            disabled
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentElement || document.body}
            format="DD/MM/YYYY"
            allowClear={false}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="deliveryDate" label="Data Entrega" rules={[{ required: true, message: 'Campo obrigatório' }]}>
          <DatePicker
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentElement || document.body}
            format="DD/MM/YYYY"
            allowClear={false}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="finishedDate" label="Finalizada em">
          <DatePicker
            disabled
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentElement || document.body}
            format="DD/MM/YYYY"
            allowClear={false}
          />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name="finished" label="Finalizado" initialValue={false} valuePropName="checked">
          <StyledSwitch onChange={onFinishedChange} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default memo(TaskForm)

const StyledSwitch = styled(Switch).attrs({
  checkedChildren: 'Sim', unCheckedChildren: 'Não'
})`
  min-width: 55px;
`
