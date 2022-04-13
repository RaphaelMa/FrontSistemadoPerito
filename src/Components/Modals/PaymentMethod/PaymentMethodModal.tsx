import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Card, Checkbox, Divider, Form, message, Modal, Spin, Tooltip } from 'antd'
import { useUserDispatch, useUserSelector } from 'Redux/UserReducer'
import { useGetPaymentType, useSaveHire } from './useHelpers'
import { useNavigate } from 'react-router-dom'
import { PaymentType } from './types'
import useSaveCompany from 'Pages/Company/useSaveCompany'
import CompanyForm from 'Pages/Company/CompanyForm'
import successModal from 'Utils/successModal'
import messageError from 'Utils/messageError'
import styled from 'styled-components'

import Cards from 'Assets/cards.png'
import Boleto from 'Assets/boleto.png'

type PlanType = {
  _id: string,
  annual: boolean
}

type OpenProps = {
  plan: PlanType
}

type Open = ({ plan }: OpenProps) => void

export type ScheduleModalType = {
  open: Open,
  close: () => void
}

// eslint-disable-next-line no-empty-pattern
const PaymentMethodModal: React.ForwardRefRenderFunction<ScheduleModalType> = ({}, ref) => {
  const [visible, setVisible] = useState(false)
  const [plan, setPlan] = useState<PlanType | null>(null)
  const [payment_type, setPaymentType] = useState<PaymentType[]>([])

  const navigate = useNavigate()
  const { company } = useUserSelector(state => state)
  const [saveCompany, { loading: saving }] = useSaveCompany()
  const [{ loading: payment_type_loading }, getPaymentType] = useGetPaymentType()
  const [{ loading: saving_hire }, saveHire] = useSaveHire()
  const dispatch = useUserDispatch()

  const [form] = Form.useForm()

  const fetchPaymentType = async () => {
    try {
      const { data } = await getPaymentType()

      if (!data?.length) return

      setPaymentType(data)
    } catch (e) {
      messageError('2011140057')
    }
  }

  useEffect(() => {
    if (visible) fetchPaymentType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const open: Open = async ({ plan }) => {
    const company_data = {
      _id: company?._id,
      active: true,
      name: company?.name,
      email: company?.email,
      kindCompany_id: company?.kindCompany_id,
      cellPhone: company?.cellPhone,
      document: company?.document,
      cep: company?.cep,
      state: company?.state,
      city: company?.city,
      neighborhood: company?.neighborhood,
      address: company?.address,
      addressNumber: company?.addressNumber,
    }

    form.setFieldsValue(company_data)
    setPlan({ ...plan })
    setVisible(true)
  }

  const close = () => setVisible(false)

  useImperativeHandle(ref, () => ({ open, close }))

  const handleSaveHire = async () => {
    const typePayment_id = payment_type.find(payment => payment.description === 'Boleto')

    try {
      const { data } = await saveHire({ data: { typePayment_id } })

      if (!data?.success) {
        message.error(data.message)
        return
      }

      successModal({
        content: (
          <TextContainer>
            <p>Contratação realizada com sucesso</p>
            <p>Dentro de alguns minutos você receberá o boleto para pagamento em seu e-mail!</p>
          </TextContainer>
        ),
        duration: 5000,
        onEndDuration: () => {
          close()
          return navigate('/')
        },
      })
    } catch (e) {
      messageError('2011140157')
    }
  }

  const handleSaveCompany = async (raw_values: any) => {
    try {
      const values = { ...raw_values, plan_id: plan?._id, annual: plan?.annual }
      const { data } = await saveCompany(values as any)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      dispatch({ type: 'UPDATE_COMPANY', payload: data.company })
      handleSaveHire()
    } catch (_e) {
      messageError('2011140156')
    }
  }

  const handleHire = () => {
    form.validateFields()
      .then(values => handleSaveCompany(values as any))
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      okText="Finalizar"
      cancelText="Fechar"
      onOk={handleHire}
      onCancel={close}
      centered={true}
      width="90%"
    >
      <Spin spinning={saving || payment_type_loading || saving_hire}>
        <Form form={form} layout="vertical">
          <Content>
            <CompanyForm width={49} setFieldsValue={form.setFieldsValue}/>

            <StyledCard>
              <Divider orientation="left" style={{ marginBottom: 40 }}>Forma de Pagamento</Divider>
              <PaymentMethodContainer>
                <MethodCard>
                  <Image src={Boleto}/>
                  <CheckboxStyled checked={true}/>
                </MethodCard>

                <Tooltip title="Em breve">
                  <MethodCard style={{ cursor: 'not-allowed' }}>
                    <Image src={Cards}/>
                    <CheckboxStyled disabled={true} checked={false}/>
                  </MethodCard>
                </Tooltip>
              </PaymentMethodContainer>
            </StyledCard>
          </Content>
        </Form>
      </Spin>
    </Modal>
  )
}

export default forwardRef(PaymentMethodModal)

const Content = styled.div`
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
`

const StyledCard = styled(Card)`
  width: 49%;
  height: 100%;

  .ant-divider.ant-divider-horizontal {
    margin-top: 0;
  }
`

const PaymentMethodContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

const MethodCard = styled.div`
  padding: 10px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100px;
  height: 65px;
`

const CheckboxStyled = styled(Checkbox)`
  margin-top: 10px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 16px;
`
