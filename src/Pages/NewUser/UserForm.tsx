import React from 'react'
import { Card, Divider, Row, Col, Form, Input, DatePicker } from 'antd'
import styled from 'styled-components'
import AreasInput from 'Components/Inputs/Areas/AreasInput'
import UserKindInput from 'Components/Inputs/UserKindInput/UserKindInput'
import ProfessionalInput from 'Components/Inputs/Professional/ProfessionalInput'
import PhoneInput from 'Utils/PhoneInput'
import CpfInput from 'Utils/CpfInput'
import { normalizePhone } from 'Utils/functions'

type Props = {
  isAdmin?: boolean,
  id?: string,
}

const UserForm: React.FC<Props> = ({ id, isAdmin }) => {

  return (
    <StyledCard>
      <Divider orientation="left" style={{ marginBottom: 40 }}>Usuário</Divider>
      <Form.Item noStyle name="_id">
        <Input type="hidden"/>
      </Form.Item>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Nome do usuário"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <Input placeholder="Nome do usuário"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="E-mail"
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              { required: true, message: 'Campo obrigatório' },
              { validateTrigger: 'onBlur', type: 'email', message: 'E-mail inválido' }
            ]}
          >
            <Input placeholder="E-mail"/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="cpf"
            label="Cpf"
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              { required: true, message: 'Campo obrigatório' },
            ]}
          >
            <CpfInput />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="birthday"
            label="Data de nascimento"
            validateTrigger={['onChange', 'onBlur']}
            rules={[
              { required: true, message: 'Campo obrigatório' },
            ]}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} placeholder="Data de nascimento"/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="cellphone"
            label="Contato"
            normalize={normalizePhone}
          >
            <PhoneInput />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="kindUser_id"
            label="Tipo de usuário"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <UserKindInput/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="professional_id"
            label="Atuando Como"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <ProfessionalInput/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="areaId"
            label="Área de atuação"
            rules={[{ required: true, message: 'Campo obrigatório' }]}
          >
            <AreasInput/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Senha"
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              { validateTrigger: 'onBlur',
                validator: (rule, value) => {
                  if (!value || value.length >= 6) return Promise.resolve()

                  return Promise.reject('Deve possuir ao menos 6 caracteres!')
                }
              },
              { required: !id, message: 'Campo obrigatório' }
            ]}
          >
            <Input.Password placeholder="Informe a senha"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="confirm_password"
            label="Confirmar Senha"
            dependencies={['password']}
            validateTrigger={['onBlur', 'onChange']}
            hasFeedback
            rules={[
              { required: !id, message: 'Campo obrigatório' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('As senhas informadas são diferentes!')
                },
              }),
            ]}
          >
            <Input.Password placeholder="Informe a senha"/>
          </Form.Item>
        </Col>
      </Row>
    </StyledCard>
  )
}

export default UserForm

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  margin-bottom: 20px;

  .ant-divider.ant-divider-horizontal {
    margin-top: 0;
  }
`
