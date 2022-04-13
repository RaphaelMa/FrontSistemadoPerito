import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Drawer, Form, Button, Spin, message } from 'antd'
import messageError from 'Utils/messageError'
import styled from 'styled-components'
import successModal from 'Utils/successModal'
import { KeywordType } from './types'
import KeywordForm from './KeywordForm'
import useGetKeyword from './useGetKeyword'
import useSaveKeyword from './useSaveKeyword'

type OpenType = (id?: string) => void

export type KeywordDrawerRefType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  afterSave: (keyword: Omit<KeywordType, '_id'> & { _id: string }) => void,
}

const Keyword: React.ForwardRefRenderFunction<KeywordDrawerRefType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const [getKeyword, { loading }] = useGetKeyword()
  const [saveKeyword, { loading: save_loading }] = useSaveKeyword()

  const open: OpenType = (id) => {
    if (id) loadKeyword(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => form.resetFields(), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const loadKeyword = async (id: string) => {
    try {
      const response = await getKeyword(id)
      const keyword = response.data.keyWord

      form.setFieldsValue(keyword)
    } catch (error) {
      messageError('202008222208')
      return
    }
  }

  const save = async (values: KeywordType) => {
    let response
    try {
      response = await saveKeyword(values)
    } catch (error) {
      messageError('202008222139')
      return
    }

    const success = response.data.success
    const keyword = response.data.keyWord

    if (success) {
      successModal({ content: 'Palavra chave salva com sucesso' })
      afterSave({ ...values, _id: keyword._id })
      close()
      return
    }

    message.error(response.data.message)
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as KeywordType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Palavra Chave"
      width={500}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={loading || save_loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || save_loading}>
        <KeywordForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(Keyword)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
