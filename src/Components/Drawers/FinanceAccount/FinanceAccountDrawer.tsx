import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Drawer, Form, Button, Spin, message } from 'antd'
import useGetFinanceAccount from './useGetFinanceAccount'
import useSaveFinanceAccount from './useSaveFinanceAccount'
import { FinanceAccount } from './types'
import messageError from 'Utils/messageError'
import FinanceAccountForm from './FinanceAccountForm'
import styled from 'styled-components'
import successModal from 'Utils/successModal'

type OpenType = (id?: string) => void

export type FinanceAccountDrawerType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  afterSave: (account: Omit<FinanceAccount, '_id'> & { _id: string }) => void,
}

const FinanceAccountDrawer: React.ForwardRefRenderFunction<FinanceAccountDrawerType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const [getFinanceAccount, { loading }] = useGetFinanceAccount()
  const [saveFinanceAccount, { loading: save_loading }] = useSaveFinanceAccount()

  const open: OpenType = (id) => {
    if (id) loadFinanceAccount(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    form.resetFields()
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const loadFinanceAccount = async (id: string) => {
    let response
    try {
      response = await getFinanceAccount(id)

    } catch (error) {
      messageError('202130051707')
      return
    }

    form.setFieldsValue(response.data.financialAccount)
  }

  const save = async (values: FinanceAccount) => {
    let response
    try {
      response = await saveFinanceAccount(values)
    } catch (error) {
      messageError('202130051708')
      return
    }

    const success = response.data.success
    const account = response.data.financialAccount

    if (success) {
      successModal({ content: 'Conta bancária salva com sucesso!' })
      afterSave({ ...values, _id: account._id })
      close()
      return
    }

    message.error(response.data.message)
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as FinanceAccount))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Conta Bancária"
      width={700}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>

          <Button loading={loading || save_loading} onClick={handleSave} type="primary">
            Salvar
          </Button>
        </Footer>
      }
    >
      <Spin spinning={loading || save_loading}>
        <FinanceAccountForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(FinanceAccountDrawer)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
