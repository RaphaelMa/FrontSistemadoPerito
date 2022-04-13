import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Drawer, Form, Button, Spin, message } from 'antd'
import useGetStatusImpugnation from './useGetStatusImpugnation'
import useSaveStatus from './useSaveStatus'
import { StatusImpeachment } from './types'
import messageError from 'Utils/messageError'
import StatusForm from './StatusImpguantionForm'
import styled from 'styled-components'
import successModal from 'Utils/successModal'

type OpenType = (id?: string) => void

export type StatusDrawerType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  afterSave: (status: Omit<StatusImpeachment, '_id'> & { _id: string }) => void,
}

const StatusImpugnationDrawer: React.ForwardRefRenderFunction<StatusDrawerType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const [getStatus, { loading }] = useGetStatusImpugnation()
  const [saveStatus, { loading: save_loading }] = useSaveStatus()

  const open: OpenType = (id) => {
    if (id) loadStatus(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    form.resetFields()
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const loadStatus = async (id: string) => {
    let response
    try {
      response = await getStatus(id)

    } catch (error) {
      messageError('202105162008')
      return
    }

    form.setFieldsValue(response.data.statusImpeachment)
  }

  const save = async (values: StatusImpeachment) => {
    let response
    try {
      response = await saveStatus(values)
    } catch (error) {
      messageError('202105162005')
      return
    }

    const success = response.data.success
    const status = response.data.statusImpeachment

    if (success) {
      successModal({ content: 'Status de impugnação salvo com sucesso!' })
      afterSave({ ...values, _id: status._id })
      close()
      return
    }

    message.error(response.data.message)
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as StatusImpeachment))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Status de Impugnação"
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
        <StatusForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(StatusImpugnationDrawer)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
