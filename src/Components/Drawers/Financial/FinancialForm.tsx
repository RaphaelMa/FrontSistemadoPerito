import React from 'react'
import { FormInstance } from 'antd/lib/form'
import { Alert, Col, DatePicker, Form, Input, Row, Switch } from 'antd'
import AccountsInput from 'Components/Inputs/Financial/Accounts/AccountsInput'
import FinanceCategory from 'Components/Inputs/FinanceCategory/FinanceCategory'
import ProcessInput from 'Components/Inputs/ProcessInput/ProcessInput'
import PersonInput from 'Components/Inputs/PersonInput/PersonInput'
import MovementInput from 'Components/Inputs/Movements/Movements'
import CurrencyInput from 'Components/Inputs/CurrencyInput'
import moment from 'moment'
import { Collapse } from 'antd';

type Props = {
  form: FormInstance,
  is_paid: boolean,
  handleChangeReverse: () => void
  afterSave?: () => void
}

const initial_values = {
  _id: null,
  isPaid: false,
  expirationDate: moment(),
  movement_id: null,
  category_id: null,
  financialAccount_id: null,
  value: 0,
  discount: 0,
  partialReceipt: 0,
  porcentReceptiValue: 0,
  recepetPartial: 0,
  observation: ''
}

const FinancialForm: React.FC<Props> = ({ form, is_paid, afterSave, handleChangeReverse }) => {

  const { Panel } = Collapse;
  
  function callback(key: any){
    console.log(key);
  }

  const handleChangeIsPaid = (value: boolean) => {
    if (is_paid && !value) handleChangeReverse()
  }

  return (
    <Form layout="vertical" form={form} initialValues={initial_values}>
      <Form.Item name="_id" noStyle>
        <Input type="hidden"/>
      </Form.Item>

      <Row gutter={8} style={{ marginBottom: 10 }}>
        {is_paid && (
          <Col span={24} style={{ marginBottom: 10 }}>
            <Alert
              showIcon={true}
              type="info"
              message="Esta movimentação já consta como paga e não pode ser alterada. Para alterá-la você deve
          realizar o seu estorno ou excluí-la"
            />
          </Col>
        )}

        <div>
          <Form.Item name="isPaid" noStyle valuePropName="checked">
            <Switch style={{ marginRight: 5 }} size="small" onChange={handleChangeIsPaid}/>
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue }) => {
              const form_is_paid = getFieldValue('isPaid')

              if (is_paid) {
                return <span>{form_is_paid ? 'Estornar Movimentação' : 'Marcar movimentação como paga'}</span>
              }

              return <span>{form_is_paid ? 'Movimentação paga' : 'Marcar movimentação como paga'}</span>
            }}
          </Form.Item>
        </div>
      </Row>

      <Row gutter={8}>
        <Col span={7}>
          <Form.Item
            label="Data de Vencimento"
            name="expirationDate"
            rules={[
              { required: true, message: 'Campo obrigatório' }
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              allowClear={false}
            />
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item
            label="Movimentação"
            name="movement_id"
            rules={[
              { required: true, message: 'Campo obrigatório' }
            ]}
          >
            <MovementInput/>
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            label="Categoria"
            name="category_id"
            rules={[
              { required: true, message: 'Campo obrigatório' }
            ]}
          >
            <FinanceCategory afterSave={afterSave} show_create_button={true}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Número do Processo"
            name="process_id"
          >
            <ProcessInput allowClear={true}/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Pessoa" name="people_id">
            <PersonInput with_users={true} show_create_button={false} allowClear={true}/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={6}>
          <Form.Item
            label="Valor"
            name="value"
            rules={[
              { required: true, message: 'Campo obrigatório' }
            ]}
          >
            <CurrencyInput disabled={is_paid}/>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Desconto"
            name="discount"
          >
            <CurrencyInput disabled={is_paid}/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Conta"
            name="financialAccount_id"
          >
            <AccountsInput query_options={{ useCache: false }} show_create_button/>
          </Form.Item>
        </Col>
      </Row>

      {/* Novos campos para o financeiro*/}
      <Row gutter={8}>
        <Col span={6}>
          <Form.Item
            label="Recebimento Parcial"
            name="recepetPartial"
          >
            <CurrencyInput disabled={is_paid}/>
          </Form.Item>
        </Col>
      </Row> 

      <Row gutter={8}>
        <Col span={6}>
          <Form.Item
            label="Recebimento Parcelado"
            name="partialReceipt"
          >
            <CurrencyInput disabled={is_paid}/>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="Qtd Parcelas"
            name="porcentReceptiValue"
          >
            <Input type="number" value="0" />
          </Form.Item>
        </Col>
      </Row> 

      <Row gutter={8}>
        <Col span={24}>
          <Form.Item
            label="Obervações"
            name="observation"
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
export default FinancialForm
