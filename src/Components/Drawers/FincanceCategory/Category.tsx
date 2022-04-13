import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer, Form, message, Spin } from 'antd'
import useGetCategory from './useGetCategory'
import styled from 'styled-components'
import CategoryForm from './CategoryForm'
import useSaveCategory, { CategoryType } from './useSaveCategory'
import messageError from 'Utils/messageError'
import successModal from 'Utils/successModal'

type OpenType = (id?: string) => void

export type CategoryDrawerType = {
  open: OpenType
  close: () => void,
}

type Props = {
  afterSave: (person: Omit<CategoryType, '_id'> & { _id: string }) => void,
}

const Category: React.ForwardRefRenderFunction<CategoryDrawerType, Props> = ({ afterSave }, ref) => {
  const [visible, setVisible] = useState(false)

  const [form] = Form.useForm()
  const [saveCategory, saving] = useSaveCategory()
  const [getCategory, loading] = useGetCategory()

  const loadCategory = async (id: string) => {
    try {
      const { data } = await getCategory(id)

      form.setFieldsValue(data.financialCategory)
    } catch (e) {
      messageError('202012301458')
    }
  }

  const open: OpenType = (id) => {
    if (id) loadCategory(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => form.resetFields(), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const save = async (values: CategoryType) => {
    try {
      const { data } = await saveCategory(values)

      if (!data.success) {
        message.error(data.message)
        return
      }

      successModal({ content: 'Categoria salva com sucesso' })
      afterSave && afterSave(data.financialCategory)
      close()
    } catch (e) {
      messageError('202012301458')
    }
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as CategoryType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Categoria"
      width={500}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={saving || loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || saving}>
        <CategoryForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(Category)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`

