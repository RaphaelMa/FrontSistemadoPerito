import React, { memo } from 'react'
import { Divider, Row, Col, Form, Input, DatePicker, Radio, InputNumber } from 'antd'
import StatusImpeachmentInput from 'Components/Inputs/StatusImpeachmentInput/StatusImpeachmentInput'
import UserInput from 'Components/Inputs/UserInput/UserInput'
import InputMask from 'react-input-mask'
import styled from 'styled-components'
import moment from 'moment'
import Card from './Card'

const ExpertiseCard: React.FC = () => (
  <Card>
    <Divider orientation="left">Dados da Perícia ou Assistência</Divider>

    <Row gutter={8}>
     {/* <Col span={7}>
        <Form.Item name="expert_id" label="Perito ou Assistente">
          <UserInput placeholder="Perito ou Assistente"/>
        </Form.Item>
      </Col>*/}

      <Col span={5}>
        <Form.Item name="expertiseDate" label="Data">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>

      <Col span={5}>
        <Form.Item
          name="hour"
          label="Hora"
          validateTrigger={['onBlur']}
          rules={[{
            validateTrigger: 'onBlur',
            validator: (_rule, value) => {
              if (!value) return Promise.resolve()

              const hour_regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
              const is_valid = moment(value, 'HH:mm').isValid() && hour_regex.test(value)

              if (is_valid) return Promise.resolve()

              return Promise.reject('Hora inválida')
            }
          }]}
        >
          <InputMask mask="99:99" maskChar={null} style={{ width: '100%' }}>
            {(props: any) => <Input {...props} placeholder="Hora" autoComplete="off"/>}
          </InputMask>
        </Form.Item>
      </Col>

      <Col span={7}>
        <Form.Item name="place" label="Local">
          <Input/>
        </Form.Item>
      </Col>
    </Row>

    <Divider orientation="left">Laudo</Divider>

    <Row gutter={8}>
      <Col span={6}>
        <Form.Item name="reportDays" label="Dias Laudo">
          <InputNumber style={{ width: '100%' }} min={0} placeholder="Dias"/>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="typeReportDays" noStyle>
          <StyledRadioGroup>
            <Radio value={true}>Corridos</Radio>
            <Radio value={false}>Úteis</Radio>
          </StyledRadioGroup>
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={8}>
      <Col span={6}>
        <Form.Item name="previsionReport" label="Previsão de Entrega">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="deliveryReport" label="Entrega do Laudo">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="clarificationReport" label="Limite Esclarecimentos">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="clarificationDeliveryReport" label="Entrega Esclarecimentos">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>
    </Row>

    <Divider orientation="left">Impugnação</Divider>

    <Row gutter={8}>
      <Col span={6}>
        <Form.Item name="dateImpugnment" label="Data Impugnação">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>

      <Col span={3}>
        <Form.Item name="impugnmentDays" label="Dias Impug">
          <InputNumber style={{ width: '100%' }} min={0} placeholder="Dias"/>
        </Form.Item>
      </Col>

      <Col span={3}>
        <Form.Item name="typeImpugnmentDays" noStyle>
          <StyledRadioGroup>
            <Radio value={true}>Corridos</Radio>
            <Radio value={false}>Úteis</Radio>
          </StyledRadioGroup>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="statusImpeachment_id" label="Status da Impugnação">
          <StatusImpeachmentInput show_create_button allowClear />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={8}>
      <Col span={6}>
        <Form.Item name="previsionImpugnment" label="Previsão de Entrega">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="deliveryImpugnment" label="Entrega da Impugnação">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="clarificationImpugnment" label="Limite Esclarecimentos">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="clarificationDeliveryImpugnment" label="Entrega Esclarecimentos">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
        </Form.Item>
      </Col>
    </Row>
  </Card>
)

export default memo(ExpertiseCard)

const StyledRadioGroup = styled(Radio.Group)`
  margin-top: 24px;

  .ant-radio-wrapper {
    display: block;
    height: 18px;
  }
`
