import React from 'react'
import { Button, Col, Form, Input, message, Row, Typography } from 'antd'
import { useUserSelector, useUserDispatch } from 'Redux/UserReducer'
import { Store } from 'antd/lib/form/interface'
import { Navigate } from 'react-router'
import { theme } from 'Styles/theme'
import { useActiveAccount, useResendCode } from './useMutations'
import { LoadingOutlined } from '@ant-design/icons'
import { fetchInitalData } from 'Redux/fetchActions'
import messageError from 'Utils/messageError'
import styled from 'styled-components'
import successModal from 'Utils/successModal'

const { Link } = Typography

const ActiveAccountForm: React.FC = () => {
  const { account_verified } = useUserSelector(state => state)
  const dispath = useUserDispatch()

  const [{ loading: active_account_loading }, mutation] = useActiveAccount()
  const [{ loading: resend_code_loading }, resendCodeMutation] = useResendCode()

  const [form] = Form.useForm()
  const { setFields } = form

  const handleSendNewCode = async () => {
    try {
      const { data } = await resendCodeMutation()

      if (!data.success) {
        message.error(data!.message)
        return
      }

      successModal({
        content: (
          <TextContainer>
            <p>Um novo código foi gerado</p>
            <p>Dentro de alguns minutos você receberá em seu e-mail!</p>
          </TextContainer>
        ),
        duration: 3000,
      })
    } catch (e) {
      messageError('2011010017')
    }
  }

  const handleActiveAccount = async ({ code }: Store) => {
    try {
      const { data } = await mutation({ data: { code } })

      if (!data.success) {
        if (data.key === 'code') {
          setFields([{ name: 'code', errors: [data.message as string] }])
          return
        }

        message.error(data.message)
        return
      }

      successModal({ content: 'Conta ativada com sucesso' })
      setTimeout(() => {
        dispath({ type: 'SET_ACTIVE_ACCOUNT', payload: true })
        fetchInitalData()
      }, 1500)
    } catch (e) {
      messageError('2010312232')
    }
  }

  if (account_verified) return <Navigate to="/"/>

  return (
    <Form
      form={form}
      initialValues={{ code: '' }}
      onFinish={handleActiveAccount}
    >
      <RowStyled>
        <Col xs={24} md={14} lg={10} xl={10} xxl={8}>
          <Form.Item
            name="code"
            validateTrigger={['onChange']}
            rules={[{ validateTrigger: 'onChange', required: true, message: 'Campo obrigatório' }]}
          >
            <Input autoFocus placeholder="Informe o código"/>
          </Form.Item>
        </Col>
      </RowStyled>

      <Row gutter={{ xs: 0, sm: 16 }} justify="center">
        <Col xs={24} sm={10} md={8} lg={6}>
          <Button
            htmlType="submit"
            style={{ width: '100%' }}
            type="primary"
            color={theme.colors.primary}
            loading={active_account_loading}
          >
            Validar código
          </Button>
        </Col>
      </Row>

      <ResendCodeRow>
        <Text>
          Caso não tenha recebido verifique sua caixa de spam ou clique abaixo para solicitar um novo código.
        </Text>

        <ResendCodeLink disabled={resend_code_loading} onClick={handleSendNewCode}>
          {resend_code_loading && <LoadingOutlined/>} Gerar Novo Código
        </ResendCodeLink>
      </ResendCodeRow>
    </Form>
  )
}

export default ActiveAccountForm

const RowStyled = styled(Row).attrs({
  justify: 'center',
  gutter: [0, 0],
})``

const Text = styled.p`
  margin: auto 0;
  font-size: 12px;
`

const ResendCodeRow = styled(RowStyled)`
  margin-top: 50px;
  flex-direction: column;
  text-align: center;
`

const ResendCodeLink = styled(Link)`
  font-weight: 600;
  width: fit-content;
  align-self: center;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
`

