import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer, Form, message, Spin } from 'antd'
import JudicialDistrictLevelForm from './JudicialDistrictLevelForm'
import styled from 'styled-components'
import useSaveJudicialDistrictLevel from './useSaveJudicialDistrictLevel'
import { JudicialDistrictLevelType } from './types'
import messageError from 'Utils/messageError'
import useGetData from './useGetData'
import successModal from 'Utils/successModal'

type OpenType = (id?: string) => void

export type JudicialDistrictDrawerType = {
  open: OpenType
  close: () => void,
}

type Props = {
  afterSave: (person: Omit<JudicialDistrictLevelType, '_id'> & { _id: string }) => void,
  judicialDistrictId: string
}

const JudicialDistrictLevel: React.ForwardRefRenderFunction<JudicialDistrictDrawerType, Props> = ({ afterSave, judicialDistrictId }, ref) => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [mutationSave, saving] = useSaveJudicialDistrictLevel()
  const [getData, loading] = useGetData()

  const loadData = async (id: string) => {
    try {
      const { data: { judicialDistrictLevel } } = await getData(id)

      form.setFieldsValue(judicialDistrictLevel)
    } catch (e) {
      messageError('2908202219')
    }
  }

  const open: OpenType = (id?: string) => {
    if (id) {
      loadData(id)
    }

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => form.resetFields(), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const save = async (values: JudicialDistrictLevelType) => {
    const data_normalized = {
      ...values,
      judicialDistrict: {
        judicialDistrictId,
      },
    }

    try {
      const { data } = await mutationSave(data_normalized)

      if (!data.success) {
        message.error(data.message)
        return
      }

      successModal({ content: 'Vara salva com sucesso' })
      afterSave && afterSave(data.judicialDistrictLevel)
      close()
    } catch (e) {
      messageError('3008201803')
    }
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as JudicialDistrictLevelType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Vara"
      width={700}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={saving || loading} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || saving}>
        <JudicialDistrictLevelForm form={form}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(JudicialDistrictLevel)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
