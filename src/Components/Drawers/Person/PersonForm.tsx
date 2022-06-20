import React from 'react'
import { Form, Input, Col, Row, DatePicker, Select } from 'antd'
import { FormInstance } from 'antd/lib/form'
import moment, { Moment } from 'moment'
import InputMask from 'react-input-mask'
import PhoneInput from 'Utils/PhoneInput'
import { normalizePhone } from 'Utils/functions'

type Props = {
  form: FormInstance
}

const PersonForm: React.FC<Props> = ({ form }) => {
  const disabledDate = (current: Moment) => {
    return current && current > moment().endOf('day')
  }

  return (
    <Form layout="vertical" form={form}>
      <Form.Item name="_id" noStyle>
        <Input type="hidden"/>
      </Form.Item>
      <Row gutter={8}>
        <Col span={16}>
          <Form.Item
            name="name"
            label="Nome"
            rules={[
              { required: true, message: 'Campo obrigatório' },
            ]}
          >
            <Input placeholder="Informe o nome" autoComplete="off"/>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="birthday" label="Aniversário">
            <DatePicker
              showToday={false}
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="businessEmail"
            label="E-mail Comercial"
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              { validateTrigger: 'onBlur', type: 'email', message: 'E-mail inválido' },
              { validateTrigger: 'onChange', type: 'email', message: 'Campo obrigatório!' },
            ]}
          >
            <Input placeholder="Informe o email" autoComplete="off"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="personalEmail"
            label="E-mail Pessoal"
            dependencies={['businessEmail']}
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              { validateTrigger: 'onBlur', type: 'email', message: 'E-mail inválido' },
              ({ getFieldValue }) => ({
                validator(_rule, value) {
                  if (value && getFieldValue('businessEmail') === value) {
                    return Promise.reject('E-mail comercial não pode ser igual ao pessoal')
                  }

                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Input placeholder="Informe o email" autoComplete="off"/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="personalContact"
            label="Contato Comercial"
            normalize={normalizePhone}
          >
            <PhoneInput/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="businessContact"
            label="Contato Pessoal"
            normalize={normalizePhone}
            validateTrigger={['onBlur', 'onChange']}
            dependencies={['personalContact']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_rule, value) {
                  if (value && getFieldValue('personalContact') === value) {
                    return Promise.reject('Contato comercial não pode ser igual ao pessoal')
                  }

                  return Promise.resolve()
                },
              }),
            ]}
          >
            <PhoneInput/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}>
          <Form.Item
            name="cep"
            label="CEP"
            normalize={(value) => {
              if (!value) return undefined

              return value.replace(/[^0-9]+/g, '')
            }}
          >
            <InputMask
              mask="99999-999"
              maskChar={null}
              style={{ width: '100%' }}
            >
              {(input_props: any) => <Input min={10} {...input_props} placeholder="00000-000"/>}
            </InputMask>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="state" label="Estado">
            <Input placeholder="Informe o estado"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="city" label="Cidade">
            <Input placeholder="Informe a cidade"/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item name="address" label="Endereço">
            <Input placeholder="Informe o endereço"/>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="documentType" label="Tipo">
            <Select allowClear placeholder="Tipo">
              <Select.Option value="CNPJ">CNPJ</Select.Option>
              <Select.Option value="CPF">CPF</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            noStyle
            shouldUpdate={(prev_values, cur_values) => prev_values.documentType !== cur_values.documentType}
          >
            {({ getFieldValue }) => {
              const document_type = getFieldValue('documentType')
              let mask
              if (document_type === 'CNPJ') {
                mask = '99.999.999/9999-99'
              } else {
                mask = '999.999.999-99'
              }
              return (
                <Form.Item
                  name="document"
                  label="Número Documento"
                  normalize={normalizePhone}
                  dependencies={['documentType']}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_rule, value) {
                        if (!value && (getFieldValue('documentType') === 'CPF' || getFieldValue('documentType') === 'CNPJ')) {
                          return Promise.reject('Informe o número')
                        }

                        return Promise.resolve()
                      },
                    }),
                  ]}
                >
                  <InputMask
                    mask={mask}
                    maskChar={null}
                    style={{ width: '100%' }}
                  >
                    {(input_props: any) => (
                      <Input {...input_props} placeholder={document_type ? document_type : 'CPF/CNPJ'}
                             autoComplete="off"/>
                    )}
                  </InputMask>
                </Form.Item>
              )
            }}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="agency"
            label="Agencia"
          >
            <Input placeholder="000-0" autoComplete="off"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="bankAccount"
            label="Conta Bancaria"
          >
            <Input placeholder="00000-0" autoComplete="off"/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default PersonForm
