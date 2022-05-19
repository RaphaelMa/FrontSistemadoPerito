import React, { memo, useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { isEqual, cloneDeep } from 'lodash'
import { ColumnType, FiltersType } from './Types'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { TaskType as ModalTaskType } from 'Components/Modals/TaskModal/Types'
import TaskModal, { TaskModalType } from 'Components/Modals/TaskModal/TaskModal'
import TaskColumnModal, { TaskColumnModalType } from 'Components/Modals/TaskColumn/TaskColumnModal'
import useSaveTask from 'Components/Modals/TaskModal/useSaveTask'
import useGetBoard from './useGetBoard'
import styled from 'styled-components'
import Column from './Column/Column'
import Header from './Header'
import moment from 'moment'
import useDeleteColumn from './useDeleteColumn'
import messageError from 'Utils/messageError'

const Tasks: React.FC = () => {
  const taskModalRef = useRef<TaskModalType>(null)
  const taskColumnModalRef = useRef<TaskColumnModalType>(null)

  const [columns, setColumns] = useState<ColumnType[]>([])
  const [filters, setFilters] = useState<FiltersType>({})

  const [saveTask] = useSaveTask()
  const [, getBoardData] = useGetBoard()
  const [deleteColumn] = useDeleteColumn()

  const loadBoard = useCallback(async () => {
    const { data } = await getBoardData()
    setColumns(data.task)
  }, [getBoardData])

  useEffect(() => {
    loadBoard()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openTaskModal: TaskModalType['open'] = useCallback((task_id) => {
    taskModalRef.current?.open(task_id)
  }, [])

  const openColumnModal: TaskColumnModalType['open'] = useCallback((id, name) => {
    taskColumnModalRef.current?.open(id, name)
  }, [])

  const save = useCallback(async (task: ModalTaskType, old_columns: ColumnType[], new_columns: ColumnType[]) => {
    setColumns(new_columns)

    try {
      const { data } = await saveTask(task)
      const { success } = data || {}

      if (success) return

      setColumns(old_columns)
    } catch (error) {
      setColumns(old_columns)
    }
  }, [saveTask])

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source } = result

    if (!destination || isEqual(destination, source)) return

    const origin_index = columns.findIndex(column => column.column_id === source.droppableId)
    const destination_index = columns.findIndex(column => column.column_id === destination.droppableId)

    if (origin_index === -1 || destination_index === -1) return

    const new_columns = cloneDeep(columns)
    const task = new_columns[origin_index].tasks.splice(source.index, 1)[0]

    task.column_id = columns[destination_index].column_id
    task.column_description = columns[destination_index].description

    new_columns[destination_index].tasks.splice(destination.index, 0, task)

    save(task, columns, new_columns)
  }, [columns, save])

  const afterSaveTask = useCallback(async (task: ModalTaskType, old_column_id?: string) => {
    // const { column_id } = task
    // const destination_index = columns.findIndex(column => column.column_id === column_id)
    // if (destination_index === -1) return

    // const new_columns = cloneDeep(columns)

    // // Remove da coluna antiga quando o id da coluna é editado
    // if (old_column_id && old_column_id !== column_id) {
    //   const origin_index = columns.findIndex(column => column.column_id === old_column_id)
    //   const task_index = new_columns[origin_index].tasks.findIndex(t => t._id === task._id)

    //   if (origin_index !== -1 && task_index !== -1) {
    //     new_columns[origin_index].tasks.splice(task_index, 1)
    //   }
    // }

    // const task_index = new_columns[destination_index].tasks.findIndex(t => t._id === task._id)
    // if (task_index === -1) {
    //   new_columns[destination_index].tasks.push(task)
    // } else {
    //   new_columns[destination_index].tasks[task_index] = task
    // }

    // setColumns(new_columns)

    loadBoard()
  }, [loadBoard])

  const afterSaveColumn = useCallback((column: { description: string, _id: string, order: number }) => {
    // const new_columns = cloneDeep(columns)
    // const colum_index = new_columns.findIndex(c => c.column_id === column._id)

    // // Nova coluna
    // if (colum_index === -1) {
    //   new_columns.push({ column_id: column._id, description: column.description, order: column.order, tasks: [] })
    // // Atualizando coluna
    // } else {
    //   new_columns[colum_index].description = column.description
    //   new_columns[colum_index].order = column.order
    // }

    // setColumns(new_columns)

    loadBoard()
  }, [loadBoard])

  const afterDeleteTask = useCallback((colum_id: string, task_id: string) => {
    const origin_index = columns.findIndex(column => column.column_id === colum_id)
    if (origin_index === -1) return

    const task_index = columns[origin_index].tasks.findIndex(task => task._id === task_id)
    if (task_index === -1) return

    const new_columns = cloneDeep(columns)
    new_columns[origin_index].tasks.splice(task_index, 1)

    setColumns(new_columns)
  }, [columns])

  const handleDeleteColumn = useCallback(async (id: string) => {
    const new_columns = cloneDeep(columns)
    const colum_index = new_columns.findIndex(column => column.column_id === id)

    if (colum_index === -1) return

    new_columns.splice(colum_index, 1)

    try {
      const { data } = await deleteColumn(id)
      const { success } = data || {}

      if (!success) {
        messageError('2020106031740')
        return
      }

      setColumns(new_columns)
    } catch (error) {
      messageError('2020106031740')
    }
  }, [columns, deleteColumn])

  const filtered_columns = useMemo(() => {
    let filtered_columns: ColumnType[] = columns

    if (!!filters.column_id) {
      filtered_columns = columns.filter(column => column.column_id === filters.column_id)
    }

    return filtered_columns.map(column => {
      const { tasks, ...rest } = column

      const filtered_tasks = tasks.filter(task => {
        if (filters.start_date && moment(task.deliveryDate, 'YYYY-MM-DD').isBefore(filters.start_date)) return false
        if (filters.end_date && moment(task.deliveryDate, 'YYYY-MM-DD').isAfter(filters.end_date)) return false
        if (filters.finished !== undefined && filters.finished !== task.finished) return false
        if (filters.process_id && filters.process_id !== task.process_id) return false
        if (filters.user_id && filters.user_id !== task.user_id) return false

        return true
      })

      return { ...rest, tasks: filtered_tasks }
    })
  }, [columns, filters])

  return (
    <Container>
      <Header
        openTaskModal={openTaskModal}
        openColumnModal={openColumnModal}
        setFilters={setFilters}
        type="kanban"
      />
      <BoardContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {filtered_columns.map(column => (
            <Column
              key={column.column_id}
              column_id={column.column_id}
              title={column.description}
              tasks={column.tasks}
              index={1}
              openColumnModal={openColumnModal}
              deleteColumn={handleDeleteColumn}
              openTaskModal={openTaskModal}
            />
          ))}
        </DragDropContext>
      </BoardContainer>

      <TaskModal ref={taskModalRef} afterSave={afterSaveTask} afterDeleteTask={afterDeleteTask}/>

      <TaskColumnModal ref={taskColumnModalRef} afterSave={afterSaveColumn}/>
    </Container>
  )
}

export default memo(Tasks)

const Container = styled.div`
  height: 100%;
  width: 100%;
`

const BoardContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  /* 50px do header, 42px do header do board, */
  height: calc(100vh - 100px - 42px);
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    height: 9px;               /* height of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent;        /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.colors.dark_gray};    /* color of the scroll thumb */
    border-radius: 20px;       /* roundness of the scroll thumb */
  }

  /* Scrollbars in Firefox */
  scrollbar-width: 9;
  scrollbar-color: ${p => p.theme.colors.dark_gray};
`
