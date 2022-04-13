import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Alert, Button, Drawer, Form, message, Spin } from 'antd'
import JudicialDistrictForm from './JudicialDistrictForm'
import styled from 'styled-components'
import useSaveJudicialDistrict from './useSaveJudicialDistrict'
import messageError from 'Utils/messageError'
import useGetJudicialDistrict from './useGetJudicialDistrict'
import { JudicialDistrictType } from './types'
import JudicialDistrictLevelList from 'Pages/JudicialDistrictLevel/JudicialDistrictLevelList'
import successModal from 'Utils/successModal'

type OpenType = (id?: string) => void

export type JudicialDistrictDrawerType = {
  open: OpenType
  close: () => void,
}

type Props = {
  afterSave: (district: Omit<JudicialDistrictType, '_id'> & { _id: string }) => void,
}

const JudicialDistrict: React.ForwardRefRenderFunction<JudicialDistrictDrawerType, Props> = ({ afterSave }, ref) => {
  const [id, setId] = useState('')
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [saveMutation, saving] = useSaveJudicialDistrict()
  const [getJudicialDistrict, loading] = useGetJudicialDistrict()

  const loadData = async (id: string) => {
    try {
      const { data: { judicialDistrict } } = await getJudicialDistrict(id)

      form.setFieldsValue(judicialDistrict)
    } catch (e) {
      messageError('2508202252')
    }
  }

  const open: OpenType = (id) => {
    if (id) {
      loadData(id)
      setId(id)
    }

    setVisible(true)
  }

  const close = () => {
    setVisible(false)

    form.resetFields()
    setId('')
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const save = async (values: JudicialDistrictType) => {
    try {
      const { data } = await saveMutation(values)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      successModal({ content: 'Comarca salva com sucesso' })
      afterSave && afterSave(data.judicialDistrict)
      close()
    } catch (e) {
      messageError('3008201528')
    }
  }

  const handleSave = () => {
    form.validateFields()
      .then(values => save(values as JudicialDistrictType))
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Comarca"
      width={700}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button loading={saving} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || saving}>
        <JudicialDistrictForm form={form}/>

        {id
          ? <JudicialDistrictLevelList judicialDistrictId={id}/>
          : <AlertComponent message="Você poderá adicionar as varas editando uma comarca!" type="info" showIcon/>
        }
      </Spin>
    </Drawer>
  )
}

export default forwardRef(JudicialDistrict)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`

const AlertComponent = styled(Alert)`
  border: none;
`
