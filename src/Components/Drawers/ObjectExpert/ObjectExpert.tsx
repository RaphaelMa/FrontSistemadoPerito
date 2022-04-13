import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer, Form, message, Spin } from 'antd'
import useGetObjectExpert, { ObjectExpertType } from './useGetObjectExpert'
import styled from 'styled-components'
import ObjectExpertForm from './ObjectExpertForm'
import useSaveObjectExpert from './useSaveObjectExpert'
import messageError from 'Utils/messageError'
import successModal from 'Utils/successModal'

type OpenType = (id?: string) => void

export type ObjectExpertDrawerType = {
  open: OpenType
  close: () => void,
}

type Props = {
  afterSave: (object: Omit<ObjectExpertType, '_id'> & { _id: string }) => void,
}

const ObjectExpert: React.ForwardRefRenderFunction<ObjectExpertDrawerType, Props> = ({ afterSave }, ref) => {
  const [visible, setVisible] = useState(false)

  const [form] = Form.useForm()
  const [saveObjectExpert, saving] = useSaveObjectExpert()
  const [getObjectExpert, loading] = useGetObjectExpert()

  const loadObjectExpert = async (id: string) => {
    try {
      const { data } = await getObjectExpert(id)

      if (data?.success) {
        form.setFieldsValue(data.objectExpert)
      }
    } catch (e) {
      messageError('202103201903')
    }
  }

  const open: OpenType = (id) => {
    if (id) {
      loadObjectExpert(id)
    }

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => form.resetFields(), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const save = async (values: ObjectExpertType) => {
    try {
      const { data } = await saveObjectExpert(values)

      if (!data.success) {
        message.error(data.message)
        return
      }

      successModal({ content: 'Ação/Objeto do processo salva com sucesso!' })
      afterSave?.(data.objectExpert)
      close()
    } catch (e) {
      messageError('202103201904')
    }
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as ObjectExpertType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Ação/Objeto do Processo"
      width={500}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={loading || saving} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || saving}>
        <ObjectExpertForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(ObjectExpert)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
