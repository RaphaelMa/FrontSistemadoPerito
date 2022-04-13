import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { Modal, Spin, Form } from 'antd'
import TaskColumnForm from './TaskColumnForm'
import styled from 'styled-components'
import useSaveColumn from './useSaveColumn'
import messageError from 'Utils/messageError'

type Open = (id?: string, name?: string) => void

type Props = {
  afterSave?: (column: { description: string, _id: string, order: number }) => void
}

export type TaskColumnModalType = {
  open: Open,
  close: () => void
}

const TaskColumnModal: React.ForwardRefRenderFunction<TaskColumnModalType, Props> = ({ afterSave }, ref) => {
  const [form] = Form.useForm()
  const { submit, setFieldsValue, resetFields } = form

  const [visible, setVisible] = useState(false)
  const [id, setId] = useState<string | undefined>(undefined)
  const [saveColumn, { loading }] = useSaveColumn()

  const open: Open = useCallback(async (id, name) => {
    setId(id)
    setFieldsValue({ name })
    setVisible(true)
  }, [setFieldsValue])

  const close = useCallback(() => {
    setId(undefined)
    setVisible(false)
    setTimeout(() => resetFields(), 400)
  }, [resetFields])

  useImperativeHandle(ref, () => ({ open, close }))

  const onFinish = async (values: { name: string }) => {
    try {
      const { data } = await saveColumn({ _id: id, description: values.name })
      const { success, column } = data || {}

      if (!success) {
        messageError('202106031721')
        return
      }

      close()
      afterSave?.(column)
    } catch (error) {
      messageError('202106031721')
    }
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      okText="Salvar"
      cancelText="Cancelar"
      onOk={submit}
      okButtonProps={{ loading }}
      onCancel={close}
      centered={true}
      width={420}
    >
      <Title>
        {!!id ? "Editar coluna" : "Nova coluna"}
      </Title>
      <Spin spinning={false}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <TaskColumnForm/>
        </Form>
      </Spin>
    </Modal>
  )
}

export default forwardRef(TaskColumnModal)

const Title = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
