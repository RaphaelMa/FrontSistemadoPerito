import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState } from 'react'
import { Button, Col, Form, message, Modal, Select, Spin } from 'antd'
import { Professional, WelcomeType } from './types'
import { useUserDispatch } from 'Redux/UserReducer'
import useGetProfessionals from './useGetProfessionals'
import useSaveWelcome from './useSaveWelcome'
import styled from 'styled-components'

import balloons from './assets/balloons.svg'

const { Option } = Select

type Open = () => void

export type WelcomeModalType = {
  open: Open,
  close: () => void
}

// eslint-disable-next-line no-empty-pattern
const WelcomeModal: ForwardRefRenderFunction<WelcomeModalType> = ({}, ref) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useUserDispatch()

  const [form] = Form.useForm()
  const [professionals, setProfessionals] = useState<Professional[]>([])

  const [{ loading }, getProfessionals] = useGetProfessionals()
  const [saving, saveWelcome] = useSaveWelcome()

  const fetchProfessionals = async () => {
    try {
      const { data } = await getProfessionals()

      if (!data?.length) return

      setProfessionals(data)
    } catch (_e) {
      message.error('Não foi possível carregar a lista de profissionais. Recarregue a página e tente novamente. ' +
        'Se persistir o erro entre em contato conosco pelo código:2010251603')
    }
  }

  const open: Open = async () => {
    fetchProfessionals()
    setVisible(true)
  }

  const close = () => setVisible(false)

  const save = async (values: WelcomeType) => {
    try {
      const { data } = await saveWelcome(values.professional_id)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      close()
      dispatch({ type: 'SET_SHOW_WELCOME_MODAL', payload: false })
      setTimeout(() => message.success('Seja muito Bem Vindo(a)'), 500)
    } catch (_e) {
      message.error('Não foi possível salvar as informações. Recarregue a página e tente novamente. ' +
        'Se persistir o erro entre em contato conosco pelo código:2010252126')
    }
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as WelcomeType))
  }

  useImperativeHandle(ref, () => ({ open, close }))

  return (
    <ModalStyled
      visible={visible}
      closable={false}
      centered
      width={500}
      footer={
        <Button loading={saving} onClick={handleSave} type="primary">Confirmar</Button>
      }
    >
      <Spin spinning={loading || saving}>
        <Container>
          <Title>BEM-VINDO(A) AO SISTEMA DO PERITO!</Title>

          <Balloons src={balloons} alt="Balões"/>

          <TextContainer>
            <Text>Estamos felizes em ter você aqui e nosso objetivo </Text>
            <Text>é deixar o seu dia a dia ainda mais fácil!</Text>
          </TextContainer>

          <Text>Você terá 15 dias para testar gratuitamente nossa</Text>
          <Text>solução, aproveite cada segundo!</Text>

          <Form
            form={form}
            layout="vertical"
            style={{ marginTop: 30, width: '60%' }}
            initialValues={{ professional_id: null }}
          >
            <Col span={24}>
              <Form.Item
                rules={[{ required: true, message: 'Campo obrigatório' }]}
                name="professional_id"
                label="Atuando como:"
              >
                <Select
                  size="middle"
                  style={{ width: '100%' }}
                  getPopupContainer={trigger => trigger.parentElement}
                  placeholder="Informe em que área você atua"
                >
                  {professionals.map(professional => (
                    <Option key={professional._id} value={professional._id}>
                      {professional.description}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Form>
        </Container>
      </Spin>
    </ModalStyled>
  )
}

export default forwardRef(WelcomeModal)

const ModalStyled = styled(Modal)`
  .ant-modal-body {
    padding: 24px 24px 0;
  }

  .ant-modal-footer {
    border-top: none;
    padding: 0 0 24px;
    text-align: center;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.h3`
`

const Balloons = styled.img`
  margin: 10px 0 15px;
  width: 130px;
  height: 130px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`

const Text = styled.p`
  margin: 0 !important;
`
