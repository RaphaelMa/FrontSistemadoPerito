import React from 'react'
import { Col, Form, Input, Row } from 'antd'
import PeopleCard from './PeopleCard'
import ReportCard from './ReportCard'
import ImpugnmentCard from './ImpugnmentCard'
import CurrencyInput from 'Components/Inputs/CurrencyInput'

const DeadlineForm: React.FC = () => {

  return (
    <>
      <Row gutter={8}>
        <Col span={4}>
          <Form.Item label="Perito ou Assistente" name="expertName">
            <Input placeholder="Perito ou Assistente" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="Número do Processo" name="processNumber">
            <Input placeholder="Número do Processo" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Tipo de Prazo" name="deadeLine_description">
            <Input placeholder="Tipo de Prazo" />
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item label="Prazo" name="deadeLine_date">
            <Input placeholder="Prazo" />
          </Form.Item>
        </Col>

        <Col span={2}>
          <Form.Item label="Dias" name="deadeLine_days">
            <Input placeholder="Dias" />
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item label="Val. Honorário" name="honorary">
            <CurrencyInput placeholder="Val. Honorário" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={8}>
          <Form.Item label="Situação do Processo" name="situation_description">
            <Input placeholder="Situação do Processo" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Situação Financeira do Processo" name="financialSituation_description">
            <Input placeholder="Situação Financeira do Processo" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={8}>
          <PeopleCard title="Pessoas" field_name="people" />
        </Col>

        <Col span={8}>
          <PeopleCard title="Polo Ativo" field_name="activePole" />
        </Col>

        <Col span={8}>
          <PeopleCard title="Polo Passivo" field_name="passivePole" />
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={8}>
          <ImpugnmentCard />
        </Col>

        <Col span={8}>
          <ReportCard />
        </Col>
      </Row>
    </>
  )
}

export default DeadlineForm
