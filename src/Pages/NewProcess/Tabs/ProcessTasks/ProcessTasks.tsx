import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import useGetProcessTasks, { TaskType } from './useGetProcessTasks'
import messageError from 'Utils/messageError'
import styled from 'styled-components'
import { Button, Col } from 'antd'
import { useParams } from 'react-router'
import { filterData, FiltersType } from 'Utils/functions'
import { TablePaginationConfig } from 'antd/es/table'
import { useUserSelector } from 'Redux/UserReducer'
import PermissionsContainer from 'Components/Permissions/Container'
import useDestroyTask from 'Components/Modals/TaskModal/useDestroyTask'
import MenuTop from 'Pages/NewProcess/MenuTop'
import TasksTable from './TasksTable'
import useSaveTask from 'Components/Modals/TaskModal/useSaveTask'
import TaskModal, { TaskModalType } from 'Components/Modals/TaskModal/TaskModal'
import successModal from 'Utils/successModal'

const initial_filters: FiltersType = {
  pagination: {
    current_page: 1,
    page_size: 20
  },
  sort: {
    field: 'expirationDate',
    order: 'ascend'
  }
}

const ProcessTasks: React.FC = () => {
  const { id } = useParams()

  const permissions = useUserSelector(state => state.permissions)
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const taskModalRef = useRef<TaskModalType>(null)

  const [destroy] = useDestroyTask()
  const [saveTask] = useSaveTask()
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [filters, setFilters] = useState<FiltersType>(initial_filters)

  const [{ loading }, getFinancials] = useGetProcessTasks(id)

  const fetchData = useCallback(async () => {
    if (!plan_modules?.Financial || !permissions?.financial.read) return

    try {
      const { data } = await getFinancials()

      setTasks(data.message || [])
    } catch (e) {
      messageError('202102271547')
    }
  }, [getFinancials, permissions, plan_modules])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const handleDelete = useCallback(async (task_id: string) => {
    try {
      const { data } = await destroy(task_id!)
      const { success } = data || {}

      if (!success) {
        messageError('202106122322')
        return
      }

      setTasks(old_tasks => old_tasks.filter(task_item => task_item._id !== task_id))
    } catch (error) {
      messageError('202106122323')
    }
  }, [destroy])

  const handleSave = useCallback(async (task: any) => {
    try {
      const { data } = await saveTask(task)
      const { success } = data

      if (!success) {
        messageError('202106122326')
        return
      }

      setTasks(old_tasks => old_tasks.map(raw_task => raw_task._id === task._id ? task : raw_task))
    } catch (error) {
      messageError('202106031552')
    }
  }, [saveTask])

  const handleTableChange = useCallback((pagination: TablePaginationConfig, _: any, sorter: any): void => {
    let internal_filters: FiltersType = filters

    if (sorter?.column?.sorter) {
      internal_filters = { ...internal_filters, sort: { order: sorter.order, field: sorter.field } }
    }

    internal_filters = {
      ...internal_filters,
      pagination: {
        current_page: pagination.current || internal_filters!.pagination!.current_page,
        page_size: pagination.pageSize || internal_filters!.pagination!.page_size
      }
    }

    setFilters((old_filters) => ({ ...old_filters, ...internal_filters }))
  }, [filters])

  const handleAction = useCallback((action: 'destroy' | 'edit' | 'action', task: TaskType) => {
    if (action === 'destroy') {
      handleDelete(task._id)
    } else if (action === 'edit') {
      taskModalRef?.current?.open(task._id)
    } else {
      handleSave({ ...task, finished: !task.finished })
    }
  }, [handleDelete, handleSave])

  const filtered_data = useMemo(() => (
    filterData({ data: tasks, filters, columns_keys: [] })
  ), [filters, tasks])

  const afterSave = useCallback(() => {
    successModal({ content: 'Tarefa salva com sucesso!' })
    fetchData()
  }, [fetchData])

  return (
    <PermissionsContainer has_module={plan_modules?.Task} has_permission={permissions?.task.read}>
      <Container>
        <MenuTop activePage="tasks" id={id}/>

        <Header>
          <ButtonsWrapper>
            <Button
              block
              type="primary"
              // @ts-ignore
              onClick={() => taskModalRef?.current?.open('', { process_id: id })}
            >
              Nova Tarefa
            </Button>

            <Button href="/tasks" target="_blank" rel="noopener noreferrer" type="primary">Ir Para Tarefas</Button>
          </ButtonsWrapper>
        </Header>

        <TasksTable
          loading={loading}
          handleAction={handleAction}
          tasks={filtered_data}
          handleTableChange={handleTableChange}
        />
      </Container>

      <TaskModal afterSave={afterSave} ref={taskModalRef}/>
    </PermissionsContainer>
  )
}

export default ProcessTasks

const Container = styled.div`
  height: calc(100vh - 5rem);
  padding: 2rem;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`

const ButtonsWrapper = styled(Col)`
  display: flex;
  flex-direction: row;
  gap: 8px;
`
