import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Drawer, Form, Button, Spin, message } from 'antd'
import messageError from 'Utils/messageError'
import styled from 'styled-components'
import successModal from 'Utils/successModal'
import { ProcessNatureType } from './types'
import ProcessNatureForm from './ProcessNatureForm'
import useGetProcessNature from './useGetProcessNature'
import useSaveProcessNature from './useSaveProcessNature'

type OpenType = (id?: string) => void

export type ProcessNatureDrawerRefType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  afterSave: (nature: Omit<ProcessNatureType, '_id'> & { _id: string }) => void,
}

const ProcessNature: React.ForwardRefRenderFunction<ProcessNatureDrawerRefType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const [getProcessNature, { loading }] = useGetProcessNature()
  const [saveProcessNature, { loading: save_loading }] = useSaveProcessNature()

  const open: OpenType = (id) => {
    if (id) loadProcessNature(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => form.resetFields(), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const loadProcessNature = async (id: string) => {
    try {
      const response = await getProcessNature(id)
      const nature = response.data.nature

      form.setFieldsValue(nature)
    } catch (error) {
      messageError('202008222208')
      return
    }
  }

  const save = async (values: ProcessNatureType) => {
    let response
    try {
      response = await saveProcessNature(values)
    } catch (error) {
      messageError('202008222139')
      return
    }

    const success = response.data.success
    const nature = response.data.nature

    if (success) {
      successModal({ content: 'Natureza salva com sucesso' })
      afterSave({ ...values, _id: nature._id })
      close()
      return
    }

    message.error(response.data.message)
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as ProcessNatureType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Natureza do Processo"
      width={500}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={loading || save_loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || save_loading}>
        <ProcessNatureForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(ProcessNature)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
