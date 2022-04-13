import React from 'react'
import { Row, Col, Card, Divider, Form, Input, Spin, InputNumber } from 'antd'
import { normalizePhone } from 'Utils/functions'
import CompanyKindInput from 'Components/Inputs/CompanyKind/CompanyKindInput'
import PhoneInput from 'Utils/PhoneInput'
import useGetCepData from './useGetCepData'
import InputMask from 'react-input-mask'
import styled from 'styled-components'

type Props = {
  width?: number,
  setFieldsValue: (value: any) => void,
}

const CompanyForm: React.FC<Props> = ({ width = 50, setFieldsValue }) => {
  const [fetchCep, { loading }] = useGetCepData()

  const fetchCepData = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value
    const { success, data } = await fetchCep(cep)

    if (!success) return

    const values: any = {}

    if (data?.uf) values.state = data?.uf
    if (data?.localidade) values.city = data?.localidade
    if (data?.bairro) values.neighborhood = data?.bairro
    if (data?.logradouro) values.address = data?.logradouro

    setFieldsValue(values)
  }

  return (
    <StyledCard width={width}>
      <Divider orientation="left" style={{ marginBottom: 40 }}>Empresa</Divider>
      <Form.Item noStyle name="plan_id">
        <Input type="hidden"/>
      </Form.Item>
      <Form.Item noStyle name="active">
        <Input type="hidden"/>
      </Form.Item>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Nome da empresa"
            rules={[{ required: true, message: 'Campo obrigátorio' }]}
          >
            <Input placeholder="Nome da empresa"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: 'Campo obrigátorio' },
              { type: 'email', message: 'E-mail inválido' },
            ]}
          >
            <Input placeholder="E-mail"/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="cellPhone"
            label="Contato"
            normalize={normalizePhone}
            rules={[{ required: true, message: 'Campo obrigátorio' }]}
          >
            <PhoneInput/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="kindCompany_id"
            label="Tipo empresa"
            rules={[{ required: true, message: 'Campo obrigátorio' }]}
          >
            <CompanyKindInput/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="document"
            label="Número do Documento"
            rules={[{ required: true, message: 'Campo obrigátorio' }]}
          >
            <Input placeholder="Documento"/>
          </Form.Item>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="cep"
              label="CEP"
              rules={[{ required: true, message: 'Campo obrigátorio' }]}
              normalize={(value) => value?.replace(/[^0-9.]/g, '')}
            >
              <InputMask
                mask="99999-999"
                maskChar={null}
                style={{ width: '100%' }}
                onBlur={fetchCepData}
              >
                {(input_props: any) => <Input {...input_props} placeholder="CEP"/>}
              </InputMask>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="state"
              label="Estado"
              rules={[{ required: true, message: 'Campo obrigátorio' }]}
            >
              <Input placeholder="Informe estado"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="city"
              label="Cidade"
              rules={[{ required: true, message: 'Campo obrigátorio' }]}
            >
              <Input placeholder="Informe cidade"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="neighborhood"
              label="Bairro"
              rules={[{ required: true, message: 'Campo obrigátorio' }]}
            >
              <Input placeholder="Informe bairro"/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Rua"
              rules={[{ required: true, message: 'Campo obrigátorio' }]}
            >
              <Input placeholder="Informe rua"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="addressNumber"
              label="Número"
              rules={[{ required: true, message: 'Campo obrigátorio' }]}
            >
              <StyledInputNumber min={0} placeholder="Informe número"/>
            </Form.Item>
          </Col>
        </Row>
      </Spin>
    </StyledCard>
  )
}

export default CompanyForm

type StyledCardProps = {
  width: number,
} & any

const StyledCard = styled<StyledCardProps>(Card)`
  width: ${p => p.width}%;
  height: 100%;
  margin-bottom: 20px;

  .ant-divider.ant-divider-horizontal {
    margin-top: 0;
  }
`

const StyledInputNumber = styled(InputNumber)`
  width: 100%;

  .ant-input-number-handler-wrap {
    display: none;
  }
`
