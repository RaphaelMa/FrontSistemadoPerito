import React from 'react'
import { Row, Col, Form, Input } from 'antd'
import styled from 'styled-components'

const TaskColumnForm: React.FC = () => {

  return (
    <Container gutter={8}>
      <Col span={16}>
        <Form.Item name="name" noStyle>
          <Input placeholder="Informe o nome da coluna"/>
        </Form.Item>
      </Col>
    </Container>
  )
}

export default TaskColumnForm

const Container = styled(Row)`
  display: flex;
  justify-content: center;
`
