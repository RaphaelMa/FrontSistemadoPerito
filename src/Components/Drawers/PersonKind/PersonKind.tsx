import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer, Form, message, Spin } from 'antd'
import useGetPersonKind from './useGetPersonKind'
import styled from 'styled-components'
import PersonKindForm from './PersonKindForm'
import useSavePersonKind, { PersonKindType } from './useSavePersonKind'
import messageError from 'Utils/messageError'
import successModal from 'Utils/successModal'

type OpenType = (id?: string) => void

export type PersonKindDrawerType = {
  open: OpenType
  close: () => void,
}

type Props = {
  afterSave: (person: Omit<PersonKindType, '_id'> & { _id: string }) => void,
}

const PersonKind: React.ForwardRefRenderFunction<PersonKindDrawerType, Props> = ({ afterSave }, ref) => {
  const [visible, setVisible] = useState(false)

  const [form] = Form.useForm()
  const [savePersonKind, saving] = useSavePersonKind()
  const [getPersonKind, loading] = useGetPersonKind()

  const loadPersonKind = async (id: string) => {
    try {
      const { data: { kindPeople } } = await getPersonKind(id)

      form.setFieldsValue(kindPeople)
    } catch (e) {
      messageError('2508202252')
    }
  }

  const open: OpenType = (id) => {
    if (id) loadPersonKind(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => form.resetFields(), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const save = async (values: PersonKindType) => {
    try {
      const { data } = await savePersonKind(values)

      if (!data.success) {
        message.error(data.message)
        return
      }

      successModal({ content: 'Tipo de pessoa salva com sucesso' })
      afterSave && afterSave(data.kindPeople)
      close()
    } catch (e) {
      messageError('2508202211')
    }
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as PersonKindType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Tipo de Pessoa"
      width={500}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={saving || loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || saving}>
        <PersonKindForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(PersonKind)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`

