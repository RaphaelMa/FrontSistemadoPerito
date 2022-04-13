import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { Form, message, Modal, Spin } from 'antd'
import { normalizeData } from './functions'
import { Status } from './types'
import useUpdateScheduleStatus from './useUpdateScheduleStatus'
import useGetProcessData from './useGetProcessData'
import successModal from 'Utils/successModal'
import useGetStatus from './useGetStatus'
import Content from './Content/Content'
import messageError from 'Utils/messageError'

type Open = (process_id: string) => void

type Props = {
  afterSave: () => void
}

export type ScheduleModalType = {
  open: Open,
  close: () => void
}

const ScheduleModal: React.ForwardRefRenderFunction<ScheduleModalType, Props> = ({ afterSave }, ref) => {
  const [visible, setVisible] = useState(false)
  const [loading, getProcessData] = useGetProcessData()
  const [status_arr, setStatusArr] = useState<Status[]>([])

  const [form] = Form.useForm()
  const { setFieldsValue, getFieldValue } = form
  const schedule_id = getFieldValue(['schedule', '_id']) as string

  const [{ loading: status_loading }, getStatus] = useGetStatus()
  const [saving, saveProcess] = useUpdateScheduleStatus(schedule_id)

  const fetchStatus = useCallback(async () => {
    try {
      const { data } = await getStatus()

      if (!data?.length) return

      setStatusArr(data)
    } catch (_e) {
      messageError('2010110147')
    }
  }, [getStatus])

  const fetchProcessData = useCallback(async (id: string) => {
    try {
      const { data } = await getProcessData(id)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      const normalized_data = normalizeData(data)

      setFieldsValue(normalized_data)
    } catch (error) {
      message.error('Não foi possível carregar os dados do processo. Recarregue a página e tente novamente. ' +
        'Se persistir o erro entre em contato conosco pelo código:2010202212')
    }
  }, [getProcessData, setFieldsValue])

  const open: Open = async (process_id) => {
    await fetchProcessData(process_id)
    await fetchStatus()

    setVisible(true)
  }

  const close = () => {
    setVisible(false)
  }

  const handleOpenProcess = useCallback(() => {
    const process_id = getFieldValue(['processData', '_id']) as string
    window.open(`/process/${process_id}`)
    setTimeout(() => close(), 500)
  }, [getFieldValue])

  const handleUpdateStatus = useCallback(async (status_id: string) => {
    try {
      const { data } = await saveProcess(status_id)

      if (!data.success) {
        message.error(data.message)
        return
      }

      successModal({ content: 'Status atualizado com sucesso' })
      afterSave?.()
    } catch (e) {
      message.error('Não foi possível salvar o status do agendamento. Recarregue a página e tente novamente. ' +
        'Se persistir o erro entre em contato conosco pelo código:1110200326')
    }
  }, [afterSave, saveProcess])

  useImperativeHandle(ref, () => ({ open, close }))

  return (
    <Modal
      visible={visible}
      closable={false}
      okText="Ir para Processo"
      cancelText="Fechar"
      onOk={handleOpenProcess}
      onCancel={close}
      centered={true}
      width="95%"
    >
      <Spin spinning={loading || status_loading || saving}>
        <Content form={form} status_arr={status_arr} handleUpdateStatus={handleUpdateStatus}/>
      </Spin>
    </Modal>
  )
}


export default forwardRef(ScheduleModal)
