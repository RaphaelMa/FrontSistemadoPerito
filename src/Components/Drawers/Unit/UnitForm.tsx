import React from 'react'
import { Col, Form, Input, Row } from 'antd'
import { FormInstance } from 'antd/lib/form'

type Props = {
  form: FormInstance
}

const UnitForm: React.FC<Props> = ({ form }) => (
  <Form layout="vertical" form={form}>
    <Form.Item name="_id" noStyle>
      <Input type="hidden"/>
    </Form.Item>

    <Row gutter={8}>
      <Col span={24}>
        <Form.Item
          name="description"
          label="Nome"
          rules={[{ required: true, message: 'Campo obrigatório' }]}
        >
          <Input placeholder="Informe o nome" autoComplete="off"/>
        </Form.Item>
      </Col>
    </Row>
  </Form>
)

export default UnitForm
