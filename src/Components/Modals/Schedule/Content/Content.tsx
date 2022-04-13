import React, { memo } from 'react'
import { FormInstance } from 'antd/lib/form'
import { Status } from '../types'
import { Form, Row, Divider, Card as AntCard } from 'antd'
import Header, { CardContent } from './Header'
import Card from './Card'
import styled from 'styled-components'

type Props = {
  form: FormInstance,
  status_arr: Status[]
  handleUpdateStatus: (status_id: string) => void
}

const Content: React.FC<Props> = ({ form, status_arr, handleUpdateStatus }) => {
  return (
    <Form layout="vertical" form={form} initialValues={{}}>
      <Header form={form} status_arr={status_arr} handleUpdateStatus={handleUpdateStatus}/>

      <Row justify="space-between">
        <Card form={form} title="Pessoas" field_name="peoples"/>
        <Card form={form} title="Polo Ativo" field_name="activePole"/>
        <Card form={form} title="Polo Passivo" field_name="passivePole"/>
      </Row>

      <div style={{ marginBottom: 20 }}/>

      <Row>
        <CardStyled>
          <Divider orientation="left">Laudo</Divider>

          <Row justify="space-between">
            <FormItem name={['schedule', 'previsionReport']} label="Previsão de Entrega">
              <CardContent alignCenter>{form.getFieldValue(['schedule', 'previsionReport'])}</CardContent>
            </FormItem>

            <FormItem name={['processData', 'deliveryReport']} label="Entrega Laudo">
              <CardContent alignCenter>{form.getFieldValue(['processData', 'deliveryReport'])}</CardContent>
            </FormItem>

            <FormItem name={['processData', 'clarificationDeliveryReport']} label="Limite Esclarecimentos">
              <CardContent
                alignCenter>{form.getFieldValue(['processData', 'clarificationDeliveryReport'])}</CardContent>
            </FormItem>

            <FormItem name={['processData', 'clarificationReport']} label="Entrega Esclarecimentos">
              <CardContent alignCenter>{form.getFieldValue(['processData', 'clarificationReport'])}</CardContent>
            </FormItem>
          </Row>
        </CardStyled>

        <CardStyled>
          <Divider orientation="left">Impugnação</Divider>

          <Row justify="space-between">
            <FormItem name={['processData', 'previsionImpugnment']} label="Previsão de Entrega">
              <CardContent alignCenter>{form.getFieldValue(['processData', 'previsionImpugnment'])}</CardContent>
            </FormItem>

            <FormItem name={['processData', 'deliveryImpugnment']} label="Entrega Impugnação">
              <CardContent alignCenter>{form.getFieldValue(['processData', 'deliveryImpugnment'])}</CardContent>
            </FormItem>

            <FormItem name={['processData', 'clarificationDeliveryImpugnment']} label="Limite Esclarecimentos">
              <CardContent
                alignCenter>{form.getFieldValue(['processData', 'clarificationDeliveryImpugnment'])}</CardContent>
            </FormItem>

            <FormItem name={['processData', 'clarificationImpugnment']} label="Entrega Esclarecimentos">
              <CardContent alignCenter>{form.getFieldValue(['processData', 'clarificationImpugnment'])}</CardContent>
            </FormItem>
          </Row>
        </CardStyled>
      </Row>
    </Form>
  )
}

export default memo(Content)

const CardStyled = styled(AntCard)`
  height: 25.1rem;
  overflow-x: auto;
  width: 33%;

  margin-right: 6px;

  .ant-card-body {
    padding: 1.4rem;
  }

  .ant-divider.ant-divider-horizontal {
    margin-top: 0;
  }
`

const FormItem = styled(Form.Item)`
  width: 49%;
`
