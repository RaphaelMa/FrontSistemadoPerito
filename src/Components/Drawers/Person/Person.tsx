import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Drawer, Form, Button, Spin, message } from 'antd'
import useGetPerson from './useGetPerson'
import useSavePerson, { PersonType } from './useSavePerson'
import messageError from 'Utils/messageError'
import PersonForm from './PersonForm'
import styled from 'styled-components'
import moment from 'moment'
import successModal from 'Utils/successModal'

type OpenType = (id?: string) => void

export type PersonDrawerType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  afterSave: (person: Omit<PersonType, '_id'> & { _id: string }) => void,
}

const Person: React.ForwardRefRenderFunction<PersonDrawerType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const [getPerson, { loading }] = useGetPerson()
  const [savePerson, { loading: save_loading }] = useSavePerson()

  const open: OpenType = (id) => {
    if (id) loadPerson(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    form.resetFields()
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const loadPerson = async (id: string) => {
    let response
    try {
      response = await getPerson(id)

    } catch (error) {
      messageError('202008222208')
      return
    }

    const data = response.data.people
    const person = { ...data, birthday: data.birthday ? moment(data.birthday, 'YYYY-MM-DD') : undefined }

    form.setFieldsValue(person)
  }

  const save = async (values: PersonType) => {
    let response
    try {
      response = await savePerson(values)
    } catch (error) {
      messageError('202008222139')
      return
    }

    const success = response.data.success
    const person = response.data.people

    if (success) {
      successModal({ content: 'Pessoa salva com sucesso' })
      afterSave({ ...values, _id: person._id })
      close()
      return
    }

    message.error(response.data.message)
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => ({
        ...values,
        birthday: values.birthday ? moment(values.birthday).format('YYYY-MM-DD') : undefined
      }))
      .then(values => save(values as PersonType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Pessoa"
      width={700}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={loading || save_loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || save_loading}>
        <PersonForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(Person)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
