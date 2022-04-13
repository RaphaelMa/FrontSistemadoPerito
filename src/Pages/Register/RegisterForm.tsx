import React, { memo, useEffect, useState } from 'react'
import { Button, Checkbox, Col, Form, Input, message, Row, Select } from 'antd'
import { Store } from 'antd/lib/form/interface'
import styled from 'styled-components'
import { theme } from 'Styles/theme'
import messageError from 'Utils/messageError'
import { useUserRegistration, useGetAreas, AreasType } from './useGetData'
import { useUserSelector, useUserDispatch } from 'Redux/UserReducer'
import { normalizePhone } from 'Utils/functions'
import { Navigate } from 'react-router'
import PhoneInput from 'Utils/PhoneInput'
import successModal from 'Utils/successModal'

const initial_values = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  cellPhone: '',
  areaId: '',
  accept: false
}

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm()
  const is_authenticated = useUserSelector(state => state.is_authenticated)
  const [areas, setAreas] = useState<AreasType[]>([])
  const [{ loading: area_loading }, getAreas] = useGetAreas()
  const dispatch = useUserDispatch()

  const fetchAreas = async () => {
    try {
      const { data } = await getAreas()

      setAreas(data)
      const [first_area] = data

      form.setFieldsValue({ areaId: first_area._id })
    } catch (e) {
      message.error('Não foi possível listar as areas de atuação. Recarregue a página e tente novamente. ' +
        'Se persistir o erro entre em contato conosco pelo código: 2008202138')
    }
  }

  useEffect(() => {
    fetchAreas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [{ loading }, userRegister] = useUserRegistration()

  const handleSave = async ({ name, email, password, cellPhone, areaId, accept }: Store) => {
    try {
      const { data } = await userRegister({ data: { name, email, password, cellPhone, areaId, accept } })

      if (!data.success) {
        message.error(data.message)
        return
      }

      successModal({ content: 'Conta salva com sucesso' })
      dispatch({ type: 'LOGIN', payload: { token: data!.token!, remember: false } })
    } catch (e) {
      messageError('2208202350')
    }
  }

  if (is_authenticated) {
    message.destroy()
    return <Navigate to="/"/>
  }

  return (
    <Form
      form={form}
      name="register"
      layout="vertical"
      scrollToFirstError
      onFinish={handleSave}
      initialValues={initial_values}
    >
      <RowStyled>
        <ColStyled>
          <Form.Item
            name="name"
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              { validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' },
              { validateTrigger: 'onBlur', type: 'string', message: 'Nome não pode ficar em branco.' }
            ]}
          >
            <Input placeholder="Nome completo"/>
          </Form.Item>
        </ColStyled>

        <ColStyled>
          <Form.Item
            name="email"
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              { validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' },
              { validateTrigger: 'onBlur', type: 'email', message: 'Email inválido' }
            ]}
          >
            <Input placeholder="E-mail"/>
          </Form.Item>
        </ColStyled>
      </RowStyled>

      <RowStyled>
        <ColStyled>
          <Form.Item
            name="password"
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              { validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' },
              { validateTrigger: 'onBlur', min: 6, message: 'Deve possuir ao menos 6 caracteres' }
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Senha"/>
          </Form.Item>
        </ColStyled>

        <ColStyled>
          <Form.Item
            name="confirm_password"
            dependencies={['password']}
            validateTrigger={['onBlur', 'onChange']}
            hasFeedback
            rules={[
              { validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' },
              { validateTrigger: 'onBlur', min: 6, message: 'Deve possuir ao menos 6 caracteres' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject('As senhas informadas são diferentes!')
                }
              })
            ]}
          >
            <Input.Password placeholder="Confirme sua senha"/>
          </Form.Item>

        </ColStyled>
      </RowStyled>

      <RowStyled>
        <ColStyled>
          <Form.Item
            name="cellPhone"
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              { validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' },
              { validateTrigger: 'onBlur', min: 10, message: 'Informe um telefone válido.' }
            ]}
            normalize={normalizePhone}
          >
            <PhoneInput/>
          </Form.Item>
        </ColStyled>

        <ColStyled>
          <Form.Item
            name="areaId"
            validateTrigger={['onBlur', 'onChange']}
            rules={[
              { validateTrigger: 'onChange', required: true, message: 'Informe sua área de atuação.' }
            ]}
          >
            <Select
              loading={area_loading}
              style={{ width: '100%' }}
              placeholder="Área de atuação"
            >
              {areas.map(area => (
                <Select.Option key={area._id} value={area._id}>{area.description}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </ColStyled>
      </RowStyled>

      <RowStyled>
        <Col xs={24} md={12} lg={8} xl={6}>
          <Button
            htmlType="submit"
            type="primary"
            style={{ width: '100%' }}
            color={theme.colors.primary}
            loading={loading}
          >
            Cadastrar
          </Button>
        </Col>
      </RowStyled>

      <RowStyled style={{ marginTop: 8 }}>
        <Form.Item
          name="accept"
          validateTrigger={['onBlur', 'onChange']}
          valuePropName="checked"
          rules={[
            { validator: (_, value) => value ? Promise.resolve() : Promise.reject('É preciso aceitar os termos de uso.') }
          ]}
        >
          <Checkbox>
            Declaro que li e aceito os &nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.eventbrite.com.br/support/articles/pt_BR/Troubleshooting/termos-de-uso-da-api-da-eventbrite?lg=pt_BR"
            >
              termos de uso
            </a>
          </Checkbox>
        </Form.Item>
      </RowStyled>
    </Form>
  )
}

export default memo(RegisterForm)

const RowStyled = styled(Row).attrs({
  justify: 'center',
  gutter: [22, 0]
})``

const ColStyled = styled(Col).attrs({
  xs: 24, md: 16, lg: 12, xl: 12, xxl: 8
})``
