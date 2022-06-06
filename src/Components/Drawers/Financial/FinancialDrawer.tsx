import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer, Form, message, Spin } from 'antd'
import FinancialForm from './FinancialForm'
import styled from 'styled-components'
import useSaveFinancial from './useSaveFinancial'
import useGetFinancial from './useGetFinancial'
import messageError from 'Utils/messageError'
import { FinancialType, GeneralFinancial } from './types'
import successModal from 'Utils/successModal'
import moment, { defaultFormat, Moment } from 'moment'

type OpenType = (id?: string, process_id?: string) => void

export type FinancialDrawerType = {
  open: OpenType
  close: () => void,
}

export type FinanceDrawerProps = {
  afterSave: (data?: { financial: FinancialType, generalFinancial: GeneralFinancial }) => void,
}

const FinancialDrawer: React.ForwardRefRenderFunction<FinancialDrawerType, FinanceDrawerProps> = ({ afterSave }, ref) => {
  const [visible, setVisible] = useState(false)
  const [is_paid, setIsPaid] = useState(false)

  const [form] = Form.useForm()

  const [saveMutation, saving] = useSaveFinancial()
  const [{ loading, data }, getJudicialDistrict] = useGetFinancial()

  const loadData = async (id: string) => {
    try {
      const { data: { financial } } = await getJudicialDistrict(id)

      const financial_format = {
        _id: financial._id,
        isPaid: financial.isPaid,
        expirationDate: financial.expirationDate ? moment(financial.expirationDate, defaultFormat) : null,
        movement_id: financial.movement_id,
        category_id: financial.category_id,
        process_id: financial.process_id,
        people_id: financial.people_id,
        value: financial.value,
        discount: financial.discount,
        partialReceipt: financial.value,
        porcentReceptiValue: financial.value,
        recepetPartial: financial.value,
        financialAccount_id: financial.financialAccount_id,
        observation: financial.observation,
      }

      setIsPaid(financial.isPaid)
      form.setFieldsValue(financial_format)
    } catch (e) {
      messageError('202012191615')
    }
  }

  const handleChangeReverse = async () => {
    const { financial } = data

    const financial_format = {
      _id: financial._id,
      isPaid: false,
      expirationDate: financial.expirationDate,
      movement_id: financial.movement_id,
      category_id: financial.category_id,
      process_id: financial.process_id,
      people_id: financial.people_id,
      value: financial.value,
      discount: financial.discount,
      partialReceipt: financial.value,
      porcentReceptiValue: financial.value,
      recepetPartial: financial.value,
      financialAccount_id: financial.financialAccount_id,
      observation: financial.observation,
    }

    const { success, data: save_data } = await save(financial_format)

    if (!success) return

    successModal({ content: 'Movimentação estornada!' })
    afterSave?.(save_data!)
    setIsPaid(false)
    form.setFieldsValue({ ...financial_format, expirationDate: moment(financial.expirationDate) })
  }

  const open: OpenType = (id, process_id) => {
    if (id) {
      loadData(id)
    }

    if (process_id) {
      form.setFieldsValue({ process_id })
    }

    setVisible(true)
  }

  const close = () => {
    setVisible(false)

    setTimeout(() => {
      setIsPaid(false)
      form.resetFields()
    }, 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const save = async (values: FinancialType) => {
    try {
      const { data } = await saveMutation(values)

      if (!data?.success) {
        message.error(data.message)
        return { success: false }
      }

      return { success: true, data: data }
    } catch (e) {
      messageError('202012301710')
      return { success: false }
    }
  }

  const handleSave = async () => {
    const raw_values = await form.validateFields() as Omit<FinancialType, 'expirationDate'> & { expirationDate: Moment }

    const values = {
      ...raw_values,
      expirationDate: raw_values.expirationDate.format('YYYY-MM-DD')
    }

    const { success, data } = await save(values)

    if (!success) return

    successModal({ content: 'Movimentação salva com sucesso!' })
    afterSave?.(data!)
    close()
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Movimentação"
      width={700}
      destroyOnClose={true}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button disabled={is_paid || loading} loading={saving} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Spin spinning={loading || saving}>
        <FinancialForm afterSave={afterSave} form={form} is_paid={is_paid} handleChangeReverse={handleChangeReverse}/>
      </Spin>
    </Drawer>
  )
}

export default forwardRef(FinancialDrawer)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
