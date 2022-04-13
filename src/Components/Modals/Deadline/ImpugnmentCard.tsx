import React from 'react'
import Card from 'Pages/NewProcess/Card'
import { Col, Divider, Form, Input, Row } from 'antd'

const ImpugnmentCard: React.FC = () => {

  return (
    <Card>
      <Divider orientation="left">Impugnação</Divider>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Previsão de Entrega" name="previsionImpugnment">
            <Input placeholder="Previsão de Entrega"/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Entrega da Impugnação" name="deliveryImpugnment">
            <Input placeholder="Entrega da Impugnação"/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Limite Esclarecimentos" name="clarificationImpugnment">
            <Input placeholder="Limite Esclarecimentos"/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Entrega Esclarecimentos" name="clarificationDeliveryImpugnment">
            <Input placeholder="Entrega Esclarecimentos"/>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default ImpugnmentCard
