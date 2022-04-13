import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer, Form, message, Spin } from 'antd'
import messageError from 'Utils/messageError'
import styled from 'styled-components'
import successModal from 'Utils/successModal'
import { ProcessFinancialSituationType } from './types'
import ProcessFinancialSituationForm from './ProcessFinancialSituationForm'
import useGetProcessFinancialSituation from './useGetProcessFinancialSituation'
import useSaveProcessFinancialSituation from './useSaveProcessFinancialSituation'

type OpenType = (id?: string) => void

export type ProcessFinancialSituationDrawerRefType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  afterSave: (ProcessFinancialSituation: Omit<ProcessFinancialSituationType, '_id'> & { _id: string }) => void,
}

const ProcessFinancialSituation: React.ForwardRefRenderFunction<ProcessFinancialSituationDrawerRefType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const [getProcessFinancialSituation, { loading }] = useGetProcessFinancialSituation()
  const [saveProcessFinancialSituation, { loading: save_loading }] = useSaveProcessFinancialSituation()

  const open: OpenType = (id) => {
    if (id) loadProcessFinancialSituation(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => form.resetFields(), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const loadProcessFinancialSituation = async (id: string) => {
    try {
      const response = await getProcessFinancialSituation(id)
      const financial_situation = response.data.financialSituation

      form.setFieldsValue(financial_situation)
    } catch (error) {
      messageError('202008222208')
      return
    }
  }

  const save = async (values: ProcessFinancialSituationType) => {
    let response
    try {
      response = await saveProcessFinancialSituation(values)
    } catch (error) {
      messageError('202008222139')
      return
    }

    const success = response.data.success
    const financial_situation = response.data.financialSituation

    if (success) {
      successModal({ content: 'Situação financeira salva com sucesso' })
      afterSave({ ...values, _id: financial_situation._id })
      close()
      return
    }

    message.error(response.data.message)
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as ProcessFinancialSituationType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Situação Financeira"
      width={500}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={loading || save_loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || save_loading}>
        <ProcessFinancialSituationForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(ProcessFinancialSituation)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
