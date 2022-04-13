import React from 'react'
import { Navigate } from 'react-router'
import { Store } from 'antd/lib/form/interface'
import { Form, Input, Button } from 'antd'
import { useUserSelector } from 'Redux/UserReducer'
import { userLogin } from 'Redux/fetchActions'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'

const LoginForm: React.FC = () => {
  const [form] = Form.useForm()
  const { setFields } = form
  const { is_authenticated, loading } = useUserSelector(state => state)

  const navigate = useNavigate()

  const handleLogin = ({ email, password }: Store) => {
    userLogin({ email, password, remember: true })
      .catch((error: { key: string, message: string }) => {
        const field = error.key === 'password' ? 'password' : 'email'

        setFields([{ name: field, errors: [error.message] }])
      })
  }

  if (is_authenticated) return <Navigate to="/"/>

  return (
    <Form form={form} onFinish={handleLogin}>
      <Form.Item
        name="email"
        validateTrigger={['onBlur', 'onChange']}
        rules={[
          { validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' },
          { validateTrigger: 'onBlur', type: 'email', message: 'Email inválido' }
        ]}
      >
        <InputStyled placeholder="E-mail"/>
      </Form.Item>

      <Form.Item
        name="password"
        validateTrigger={['onBlur', 'onChange']}
        rules={[
          { validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' },
          { validateTrigger: 'onBlur', min: 6, message: 'Deve possuir ao menos 6 caracteres' }
        ]}
        style={{ marginBottom: 8 }}
      >
        <PasswordInput placeholder="Senha"/>
      </Form.Item>

      <RecoverPasswordText to="/recover-password">Recuperar minha senha</RecoverPasswordText>

      <ButtonsWrapper>
        <Button block style={{ backgroundColor: '#00FECD' }} loading={loading} htmlType="submit">
          ACESSAR
        </Button>

        <Button block loading={loading} onClick={() => navigate('/register')}>
          CADASTRAR-SE
        </Button>
      </ButtonsWrapper>
    </Form>
  )
}

export default LoginForm

const InputStyled = styled(Input)`
  height: 48px;
  border-radius: 25px;
  background-color: transparent !important;
  border: 1px solid #00FECD;
  color: #00FECD !important;
  padding: 0 22px;
  font-size: 20px;
`

const PasswordInput = styled(Input.Password)`
  height: 48px;
  border-radius: 26px;
  background-color: transparent !important;
  border: 1px solid #00FECD;
  padding: 0 22px;

  input {
    background-color: transparent !important;
    color: #00FECD !important;
    font-size: 20px;
  }

  .ant-input-suffix {
    font-size: 20px;

    .ant-input-password-icon {
      color: gray !important;
    }
  }
`

const RecoverPasswordText = styled(Link)`
  font-size: 16px;
  text-align: start;
  color: white;
  text-decoration: underline;
`

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 32px;

  .ant-btn + .ant-btn {
    margin-left: 32px;
  }

  button {
    height: 42px;
    border-radius: 26px;
    border-color: transparent;
    font-size: 20px;
    color: #01383D;
  }

  @media (max-width: 767px) {
    flex-direction: column;

    .ant-btn + .ant-btn {
      margin-left: 0;
      margin-top: 16px;
    }
  }
`
