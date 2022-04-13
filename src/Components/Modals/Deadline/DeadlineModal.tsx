import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { Modal, Spin, Form, Button } from 'antd'
import useGetDeadline from './useGetDeadline'
import DeadlineForm from './DeadlineForm'
import moment from 'moment'
import messageError from 'Utils/messageError'

type Open = (id: string) => void

export type DeadlineModalType = {
  open: Open,
  close: () => void
}

const DeadlineModal: React.ForwardRefRenderFunction<DeadlineModalType> = (_, ref) => {
  const [form] = Form.useForm()
  const { resetFields, setFieldsValue } = form

  const [process_id, setProcessId] = useState<string>()

  const [loading, getDeadline] = useGetDeadline()

  const [visible, setVisible] = useState(false)

  const formatDate = useCallback((date?: string | null) => {
    if (!date) return undefined

    return moment(date).format('DD/MM/YYYY')
  }, [])

  const open: Open = useCallback(async (id) => {
    setVisible(true)
    setProcessId(id)
    try {
      const { data } = await getDeadline(id)
      const {
        deadeLine_date, deliveryImpugnment, previsionImpugnment, clarificationImpugnment, clarificationDeliveryImpugnment,
        previsionReport, deliveryReport, clarificationReport, clarificationDeliveryReport, ...rest
      } = data?.message || {}

      const deadline = {
        ...rest,
        deadeLine_date: formatDate(deadeLine_date),
        deliveryImpugnment: formatDate(deliveryImpugnment),
        previsionImpugnment: formatDate(previsionImpugnment),
        clarificationImpugnment: formatDate(clarificationImpugnment),
        clarificationDeliveryImpugnment: formatDate(clarificationDeliveryImpugnment),
        previsionReport: formatDate(previsionReport),
        deliveryReport: formatDate(deliveryReport),
        clarificationReport: formatDate(clarificationReport),
        clarificationDeliveryReport: formatDate(clarificationDeliveryReport),
      }

      setFieldsValue(deadline)
    } catch (error) {
      messageError('202104141910')
      console.log(error)
    }
  }, [formatDate, getDeadline, setFieldsValue])

  const close = useCallback(() => {
    setVisible(false)
  }, [])

  useImperativeHandle(ref, () => ({ open, close }))

  return (
    <Modal
      visible={visible}
      onCancel={close}
      centered={true}
      width={1240}
      footer={
        <div>
          <Button type="primary" href={`process/${process_id}`} target="_blank" rel="noopener noreferrer">
            Ir para Processo
          </Button>
        </div>
      }
      afterClose={() => {
        resetFields()
        setProcessId(undefined)
      }}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <DeadlineForm />
        </Form>
      </Spin>
    </Modal>
  )
}

export default forwardRef(DeadlineModal)
