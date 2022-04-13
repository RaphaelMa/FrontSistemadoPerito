import React from 'react'
import { FormInstance } from 'antd/lib/form'
import { Col, Form, Input, Row } from 'antd'

type Props = {
  form: FormInstance
}

const ObjectExpertForm: React.FC<Props> = ({ form }) => {
  return (
    <Form layout="vertical" form={form} initialValues={{ _id: null, description: '' }}>
      <Form.Item name="_id" noStyle>
        <Input type="hidden"/>
      </Form.Item>

      <Row gutter={8}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Descrição"
            rules={[
              { required: true, message: 'Campo obrigatório' },
            ]}
          >
            <Input placeholder="Informe a ação/objeto do processo" autoComplete="off"/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default ObjectExpertForm
