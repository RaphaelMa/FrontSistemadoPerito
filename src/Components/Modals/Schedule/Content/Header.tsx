import React, { memo, useCallback } from 'react'
import { Col, Form, Modal, Row, Select } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Status } from '../types'
import styled from 'styled-components'
import { useUserSelector } from 'Redux/UserReducer'
import { FormInstance } from 'antd/lib/form'

const { Option } = Select

type Props = {
  status_arr: Status[],
  form: FormInstance,
  handleUpdateStatus: (status_id: string) => void
}

const Header: React.FC<Props> = ({ status_arr, form, handleUpdateStatus }) => {
  const { getFieldValue } = form

  const permissions = useUserSelector(state => state.permissions)

  const schedule = getFieldValue('schedule')

  const showModal = useCallback((status_id: string) => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined/>,
      title: 'Tem certeza que deseja alterar o status do Agendamento?',
      okText: 'Sim',
      cancelText: 'Fechar',
      onOk: () => handleUpdateStatus(status_id),
      onCancel: () => Modal.destroyAll()
    })
  }, [handleUpdateStatus])

  return (
    <Container gutter={5}>
      <Col style={{ minWidth: 150, maxWidth: 350 }}>
        <Form.Item label="Perito/Assistente">
          <CardContent title={schedule['expertName']}>{schedule['expertName']}</CardContent>
        </Form.Item>
      </Col>

      <Col style={{ width: 100 }}>
        <Form.Item label="Data">
          <CardContent alignCenter title={schedule['expertiseDate']}>{schedule['expertiseDate']}</CardContent>
        </Form.Item>
      </Col>

      <Col style={{ width: 90 }}>
        <Form.Item label="Hora">
          <CardContent alignCenter title={schedule['hour']}>{schedule['hour']}</CardContent>
        </Form.Item>
      </Col>

      <Col style={{ minWidth: 150, maxWidth: 300 }}>
        <Form.Item label="Local">
          <CardContent title={schedule['place']}>{schedule['place']}</CardContent>
        </Form.Item>
      </Col>

      <Col style={{ minWidth: 100 }}>
        <Form.Item label="N° Processo">
          <CardContent alignCenter title={schedule['processNumber']}>{schedule['processNumber']}</CardContent>
        </Form.Item>
      </Col>

      <Col style={{ width: 150 }}>
        <Form.Item label="Tipo de Prazo">
          <CardContent title={schedule['deadLine_description']}>{schedule['deadLine_description']}</CardContent>
        </Form.Item>
      </Col>

      <Col style={{ width: 140 }}>
        <Form.Item label="Val. Honorário">
          <CardContent title={schedule['honoraryValue']}>{schedule['honoraryValue']}</CardContent>
        </Form.Item>
      </Col>

      <Col style={{ width: 130 }}>
        <Form.Item
          name={['schedule', 'scheduleStatus_description']}
          label="Status"
        >
          <Select
            onSelect={(value, option) => showModal(option.id as string)}
            size="middle"
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentElement}
            disabled={!permissions?.schedule.update}
          >
            {status_arr.map(status => (
              <Option
                key={status._id}
                id={status._id}
                style={{ color: status.color, paddingLeft: 5, paddingRight: 5 }}
                value={status.description}
              >
                {status.description}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Container>
  )
}

export default memo(Header)

const Container = styled(Row)`
  justify-content: space-between;
  flex-wrap: nowrap;
`

type ContentType = {
  alignCenter?: boolean
}

export const CardContent = styled.div<ContentType>`
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
  padding: 0 7px;
  min-height: 32px;
  border: 1px solid #d9d9d9;
  cursor: not-allowed;
  justify-content: ${p => p.alignCenter ? 'center' : 'unset'};
`
