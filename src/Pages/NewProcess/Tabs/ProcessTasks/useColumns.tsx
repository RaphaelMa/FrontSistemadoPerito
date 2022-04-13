import React, { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { TaskType } from './useGetProcessTasks'
import DateTag from 'Pages/Tasks/Kanban/Task/DateTag'
import { Popconfirm, Button, Switch, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from '../../../../Styles/theme'
import styled from 'styled-components'

const useColumns = (handleAction: (actions: 'destroy' | 'edit' | 'action', task: TaskType) => void) => {
  return useMemo(() => {
    const columns: ColumnsType<TaskType> = [
      {
        title: 'Coluna',
        dataIndex: 'column_description',
        key: 'column_description',
        ellipsis: true
      },
      {
        title: 'Título',
        dataIndex: 'title',
        key: 'title',
        ellipsis: true
      },
      {
        title: 'Responsável',
        dataIndex: 'user_name',
        key: 'user_name',
        width: 250,
        ellipsis: true
      },
      {
        title: 'Processo',
        dataIndex: 'process_number',
        key: 'process_number',
        align: 'center',
        width: 250,
        ellipsis: true
      },
      {
        title: 'Data Entrega',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
        align: 'center',
        width: 110,
        render: (_: string, task) => (
          <DateTag
            // @ts-ignore
            task={{ ...task, column_id: task.column_description, deliveryDate: task.deliveryDate }}
            date_format="DD/MM/YYYY"
          />
        )
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
        align: 'center',
        width: 140,
        render: (_, task) => (
          <ActionsContainer>
            <Popconfirm
              title={
                <>
                  <div>A tarefa será excluída</div>
                  <div>Deseja continuar?</div>
                </>
              }
              okText="Sim"
              cancelText="Não"
              okType="danger"
              placement="topLeft"
              onConfirm={() => handleAction('destroy', task)}
            >
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              />
            </Popconfirm>

            <Button
              type="text"
              icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
              onClick={() => handleAction('edit', task)}
            />

            <Tooltip title={`Marcar como ${task.finished ? 'não' : ''} concluído`}>
              <Switch
                onChange={() => handleAction('action', task)}
                style={{ marginLeft: 5 }}
                size="small"
                checked={task.finished}
              />
            </Tooltip>
          </ActionsContainer>
        )
      }
    ]

    return columns
  }, [handleAction])
}

export default useColumns

const ActionsContainer = styled.div`
  display: block;
  justify-content: space-between;
`
