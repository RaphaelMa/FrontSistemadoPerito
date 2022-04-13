import React from 'react'
import { Button, Col, Form, Input, message, Row } from 'antd'
import { Store } from 'antd/lib/form/interface'
import MainContainer from 'Components/MainContainer/MainContainer'
import styled from 'styled-components'
import { theme } from 'Styles/theme'
import useUserPasswordRecovery from './useUserRecoverPassword'
import messageError from 'Utils/messageError'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const RecoverPassword = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [{ loading }, userPassword] = useUserPasswordRecovery()

  const handleSave = async ({ email }: Store) => {
    try {
      const { data } = await userPassword({ data: { email } })

      if (!data.success) {
        message.error(data.message)
        return
      }

      message.success(data.message,
        setTimeout(() => {
          message.destroy()
          navigate('/login')
        }, 4000),
      )
    } catch (e) {
      messageError('2308200020')
    }
  }

  const logo_subtitle = 'Informe seu e-mail cadastrado no sistema para recuperar a sua senha.'

  return (
    <MainContainer logo_subtitle={logo_subtitle}>
      <Form
        form={form}
        name="password-recovery"
        layout="vertical"
        scrollToFirstError
        onFinish={handleSave}
        initialValues={{ email: '' }}
      >
        <RowStyled>
          <ColStyled>
            <Form.Item
              name="email"
              validateTrigger={['onBlur', 'onChange']}
              rules={[
                { validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' },
                { validateTrigger: 'onBlur', type: 'email', message: 'Email inválido' },
              ]}
            >
              <Input autoFocus placeholder="E-mail"/>
            </Form.Item>
          </ColStyled>
        </RowStyled>

        <Row gutter={{ xs: 0, sm: 16 }} justify="center">
          <Col xs={24} sm={10} md={8} lg={6}>
            <Button
              htmlType="submit"
              style={{ width: '100%' }}
              type="primary"
              color={theme.colors.primary}
              loading={loading}
            >
              Recuperar
            </Button>
          </Col>

          <BackButton to="/login">Voltar para o login</BackButton>
        </Row>
      </Form>
    </MainContainer>
  )
}

export default RecoverPassword

const RowStyled = styled(Row).attrs({
  justify: 'center',
  gutter: [0, 0],
})``

const ColStyled = styled(Col).attrs({
  xs: 24, md: 16, lg: 14, xl: 14, xxl: 10,
})``

const BackButton = styled(Link)`
  margin-top: 16px;
  text-align: center;
  color: ${p => p.theme.colors.primary};
  text-decoration: underline;
`
