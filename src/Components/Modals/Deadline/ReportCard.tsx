import React from 'react'
import Card from 'Pages/NewProcess/Card'
import { Col, Divider, Form, Input, Row } from 'antd'

const ReportCard: React.FC = () => {

  return (
    <Card>
      <Divider orientation="left">Laudo</Divider>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Previsão de Entrega" name="previsionReport">
            <Input placeholder="Previsão de Entrega"/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Entrega Laudo" name="deliveryReport">
            <Input placeholder="Entrega Laudo"/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Limite Esclarecimentos" name="clarificationReport">
            <Input placeholder="Limite Esclarecimentos"/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Entrega Esclarecimentos" name="clarificationDeliveryReport">
            <Input placeholder="Entrega Esclarecimentos"/>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default ReportCard
