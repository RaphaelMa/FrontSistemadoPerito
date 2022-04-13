import React, { useEffect, useMemo, useRef, useState } from 'react'
import useGetTasks, { TaskType } from './useGetTasks'
import messageError from 'Utils/messageError'
import Header from '../Kanban/Header'
import styled from 'styled-components'
import { FiltersType } from '../Kanban/Types'
import moment from 'moment'
import Table from './Table'
import TaskModal, { TaskModalType } from 'Components/Modals/TaskModal/TaskModal'
import TaskColumnModal, { TaskColumnModalType } from 'Components/Modals/TaskColumn/TaskColumnModal'
import useDestroyTask from 'Components/Modals/TaskModal/useDestroyTask'
import { cloneDeep } from 'lodash'
import useExportData from './useExportData'

const List: React.FC = () => {
  const taskModalRef = useRef<TaskModalType>(null)
  const taskColumnModalRef = useRef<TaskColumnModalType>(null)

  const [{ loading }, getTasks] = useGetTasks()
  const [deleteTask] = useDestroyTask()

  const [tasks, setTasks] = useState<TaskType[]>([])
  const [filters, setFilters] = useState<FiltersType>({})

  const fetchData = async () => {
    try {
      const { data } = await getTasks()

      setTasks(data.task || [])
    } catch (e) {
      messageError('202102271547')
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const destroyTask = async (id: string) => {
    try {
      const { data } = await deleteTask(id)
      const { success } = data || {}

      if (success) fetchData()
    } catch (error) {
      messageError('202106042250')
    }
  }

  const updateTaskFinished = (task: TaskType) => {
    setTasks(old_tasks => {
      const index = old_tasks.findIndex(t => t._id === task._id)

      const new_tasks = cloneDeep(old_tasks)

      new_tasks[index] = task

      return new_tasks
    })
  }

  const filtered_data = useMemo(() => {
      const filtered_tasks = tasks.filter(task => {
        if (filters.start_date && moment(task.deliveryDate, 'YYYY-MM-DD').isBefore(filters.start_date)) return false
        if (filters.end_date && moment(task.deliveryDate, 'YYYY-MM-DD').isAfter(filters.end_date)) return false
        if (filters.finished !== undefined && filters.finished !== task.finished) return false
        if (filters.process_id && filters.process_id !== task.process_id) return false
        if (filters.column_id && filters.column_id !== task.column_id) return false
        if (filters.user_id && filters.user_id !== task.user_id) return false

        return true
      })

      return filtered_tasks
  }, [filters, tasks])

  const exportToXLS = useExportData(filtered_data)

  return (
    <Container>
      <Header
        setFilters={setFilters}
        type="list"
        openTaskModal={() => taskModalRef.current?.open()}
        openColumnModal={() => taskColumnModalRef.current?.open()}
        exportToXLS={exportToXLS}
      />

      <Table
        loading={loading}
        tasks={filtered_data}
        handleDelete={destroyTask}
        handleEdit={(id) => taskModalRef.current?.open(id)}
        updateTaskFinished={updateTaskFinished}
      />

      <TaskModal ref={taskModalRef} afterSave={() => fetchData()} afterDeleteTask={() => fetchData()}/>

      <TaskColumnModal ref={taskColumnModalRef}/>
    </Container>
  )
}

export default List

const Container = styled.div`
  height: calc(100vh - 5rem);
  padding: 0 2rem 2rem 0;
`
