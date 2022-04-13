import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Drawer, Form, Button, Spin, message } from 'antd'
import messageError from 'Utils/messageError'
import styled from 'styled-components'
import successModal from 'Utils/successModal'
import { ProcessSituationType } from './types'
import ProcessSituationForm from './ProcessSituationForm'
import useGetProcessSituation from './useGetProcessSituation'
import useSaveProcessSituation from './useSaveProcessSituation'

type OpenType = (id?: string) => void

export type ProcessSituationDrawerRefType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  afterSave: (situation: Omit<ProcessSituationType, '_id'> & { _id: string }) => void,
}

const ProcessSituation: React.ForwardRefRenderFunction<ProcessSituationDrawerRefType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const [getProcessSituation, { loading }] = useGetProcessSituation()
  const [saveProcessSituation, { loading: save_loading }] = useSaveProcessSituation()

  const open: OpenType = (id) => {
    if (id) loadProcessSituation(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => form.resetFields(), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const loadProcessSituation = async (id: string) => {
    try {
      const response = await getProcessSituation(id)
      const situation = response.data.situation

      form.setFieldsValue(situation)
    } catch (error) {
      messageError('202008222208')
      return
    }
  }

  const save = async (values: ProcessSituationType) => {
    let response
    try {
      response = await saveProcessSituation(values)
    } catch (error) {
      messageError('202008222139')
      return
    }

    const success = response.data.success
    const situation = response.data.situation

    if (success) {
      successModal({ content: 'Situação salva com sucesso' })
      afterSave({ ...values, _id: situation._id })
      close()
      return
    }

    message.error(response.data.message)
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as ProcessSituationType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Situação do Processo"
      width={500}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={loading || save_loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || save_loading}>
        <ProcessSituationForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(ProcessSituation)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
