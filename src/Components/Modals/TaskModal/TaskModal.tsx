import React, { forwardRef, useCallback, useImperativeHandle, useState, memo } from 'react'
import { Modal, Spin, Form } from 'antd'
import { TaskFormType, TaskType } from './Types'
import useGetTask from './useGetTask'
import TaskForm from './TaskForm'
import Footer from './Footer'
import moment from 'moment'
import useSaveTask from './useSaveTask'
import messageError from 'Utils/messageError'
import useDestroyTask from './useDestroyTask'
import History from './History/History'

type Open = (task_id?: string, initial_data?: TaskType) => void

type Props = {
  afterSave?: (task: TaskType, old_column_id?: string) => void,
  afterDeleteTask?: (column_id: string, task_id: string) => void
}

export type TaskModalType = {
  open: Open,
  close: () => void
}

const TaskModal: React.ForwardRefRenderFunction<TaskModalType, Props> = ({ afterSave, afterDeleteTask }, ref) => {
  const [form] = Form.useForm<TaskFormType>()
  const { submit, setFieldsValue, resetFields } = form

  const [visible, setVisible] = useState(false)
  const [task_id, setTaskId] = useState<string | undefined>(undefined)
  const [old_column, setOldColumn] = useState<string | undefined>(undefined)

  const [loadTask, { loading }] = useGetTask()
  const [saveTask, { loading: save_loading }] = useSaveTask()
  const [deleteTask, { loading: delete_loading }] = useDestroyTask()

  const open: Open = useCallback(async (task_id, initial_data) => {
    setTaskId(task_id)
    setVisible(true)

    if (initial_data) {
      // @ts-ignore
      setFieldsValue(initial_data)
    }

    if (!task_id) return

    const { data } = await loadTask(task_id)
    const { task } = data
    setOldColumn(task?.column_id)

    const { createAt, deliveryDate, finishedDate, ...rest } = task || {}
    const values = {
      ...rest,
      deliveryDate: deliveryDate ? moment(deliveryDate).utc() : undefined,
      createAt: createAt ? moment(createAt).utc() : undefined,
      finishedDate: finishedDate ? moment(finishedDate).utc() : undefined
    }

    setFieldsValue(values)
  }, [loadTask, setFieldsValue])

  const close = useCallback(() => {
    setTaskId(undefined)
    setVisible(false)
    setTimeout(() => resetFields(), 100)
  }, [resetFields])

  const onFinish = async (raw_values: TaskFormType) => {
    const { createAt, deliveryDate, finishedDate, ...rest } = raw_values

    const values = {
      ...rest,
      deliveryDate: deliveryDate.utc().format('YYYY-MM-DD'),
      createAt: createAt?.utc().format('YYYY-MM-DD'),
      finishedDate: finishedDate?.utc().format('YYYY-MM-DD')
    }

    try {
      const { data } = await saveTask(values)
      const { success, task } = data

      if (success) {
        close()
        afterSave?.(task, old_column)
      }
    } catch (error) {
      messageError('202106031552')
    }
  }

  const handleDelete = async () => {
    try {
      const { data } = await deleteTask(task_id!)
      const { success } = data || {}

      if (!success) {
        messageError('202106031647')
        return
      }

      afterDeleteTask?.(old_column!, task_id!)
      close()
    } catch (error) {
      messageError('202106031648')
    }
  }

  useImperativeHandle(ref, () => ({ open, close }))

  return (
    <Modal
      visible={visible}
      destroyOnClose={true}
      closable={true}
      onCancel={close}
      centered={true}
      title={!!task_id ? 'Editar tarefa' : 'Nova tarefa'}
      width={650}
      footer={null}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <TaskForm setFieldsValue={setFieldsValue}/>
        </Form>

        <History task_id={task_id}/>

        <Footer
          has_id={!!task_id}
          submit={submit}
          close={close}
          handleDelete={handleDelete}
          loading={save_loading || delete_loading}
        />
      </Spin>
    </Modal>
  )
}


export default memo(forwardRef(TaskModal))
