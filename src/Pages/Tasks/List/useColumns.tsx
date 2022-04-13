import React, { useCallback, useMemo } from 'react'
import { theme } from 'Styles/theme'
import { TaskType } from './useGetTasks'
import { ColumnsType } from 'antd/es/table'
import { useUserSelector } from 'Redux/UserReducer'
import { Button, message, Popconfirm, Switch } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useSaveTask from 'Components/Modals/TaskModal/useSaveTask'
import DateTag from 'Pages/Tasks/Kanban/Task/DateTag'
import messageError from 'Utils/messageError'
import moment from 'moment'

type Props = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  updateTaskFinished: (task: TaskType) => void,
}

const useColumns = ({ handleDelete, handleEdit, updateTaskFinished }: Props) => {
  const permissions = useUserSelector(state => state.permissions)

  const [saveTask, { loading }] = useSaveTask()

  const handleChangeFinished = useCallback(async (value: boolean, task: TaskType) => {
    const new_task: TaskType = {
      ...task,
      finished: value,
      finishedDate: value ? moment().format('YYYY-MM-DD') : null
    }

    try {
      const { data: { success, message: msg } } = await saveTask(new_task)

      if (success) {
        updateTaskFinished(new_task)
        return
      }

      message.error(msg)
    } catch (error) {
      messageError('202102071449')
    }
  }, [saveTask, updateTaskFinished])

  return useMemo(() => {
    const columns: ColumnsType<TaskType> = [
      {
        title: 'Coluna',
        dataIndex: 'column_description',
        key: 'column_description',
        ellipsis: true,
      },
      {
        title: 'Título',
        dataIndex: 'title',
        key: 'title',
        ellipsis: true,
      },
      {
        title: 'Responsável',
        dataIndex: 'user_name',
        key: 'user_name',
        width: 250,
        ellipsis: true,
      },
      {
        title: 'Processo',
        dataIndex: 'process_number',
        key: 'process_number',
        align: 'center',
        width: 250,
        ellipsis: true,
      },
      {
        title: 'Data Entrega',
        dataIndex: 'deliveryDateTask',
        key: 'deliveryDateTask',
        align: 'center',
        width: 110,
        render: (_: string, task) => <DateTag task={task} date_format="DD/MM/YYYY"/>
      },
      {
        title: 'Finalizado',
        dataIndex: 'finished',
        key: 'finished',
        align: 'center',
        width: 85,
        render: (finished) => finished ? 'Sim' : 'Não'
      },
      {
        title: 'Ações',
        key: 'actions',
        align: 'center',
        width: 120,
        render: (task: TaskType) => (
          <>
            {permissions?.task.delete && (
              <Popconfirm
                title={
                  <>
                    <div>A pessoa será excluída de todos os processos em que esta atrelada.</div>
                    <div>Deseja continuar?</div>
                  </>
                }
                okText="Sim"
                cancelText="Não"
                okType="danger"
                placement="topLeft"
                onConfirm={() => handleDelete(task._id)}
              >
                <Button
                  type="text"
                  icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
                />
              </Popconfirm>
            )}
            {permissions?.task.update && (
              <>
                <Button
                  type="text"
                  icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
                  onClick={() => handleEdit(task._id)}
                />

                <Switch
                  size="small"
                  checked={task.finished}
                  loading={loading}
                  onChange={(value) => handleChangeFinished(value, task)}
                />
              </>
            )}
          </>
        ),
      },
   ]

   return columns
  }, [handleChangeFinished, handleDelete, handleEdit, loading, permissions])
}

export default useColumns
