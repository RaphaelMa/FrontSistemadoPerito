import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer, Form, message, Spin } from 'antd'
import useGetUnit from './useGetUnit'
import useSaveUnit from './useSaveUnit'
import messageError from 'Utils/messageError'
import UnitForm from './UnitForm'
import styled from 'styled-components'
import successModal from 'Utils/successModal'
import { MultiCompaniesType } from 'Pages/MultiCompanies/types'

type OpenType = (id?: string) => void

export type UnitDrawerType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  afterSave: (unit: Omit<MultiCompaniesType, '_id'> & { _id: string }) => void,
}

const Unit: React.ForwardRefRenderFunction<UnitDrawerType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  const [getUnit, { loading }] = useGetUnit()
  const [saveUnit, { loading: save_loading }] = useSaveUnit()

  const open: OpenType = (id) => {
    if (id) loadUnit(id)

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    form.resetFields()
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const loadUnit = async (id: string) => {
    let response
    try {
      response = await getUnit(id)

    } catch (error) {
      messageError('2012060159')
      return
    }

    const data = response.data.multicompany

    form.setFieldsValue(data)
  }

  const save = async (values: MultiCompaniesType) => {
    let response
    try {
      response = await saveUnit(values)
    } catch (error) {
      messageError('2012060157')
      return
    }

    const success = response.data.success
    const unit = response.data.multicompany

    if (!success) {
      message.error(response.data.message)
      return
    }

    successModal({ content: 'Unidade salva com sucesso', duration: 2000 })
    afterSave({ ...values, _id: unit._id })
    close()
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as MultiCompaniesType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Unidade"
      width={500}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={loading || save_loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || save_loading}>
        <UnitForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(Unit)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
