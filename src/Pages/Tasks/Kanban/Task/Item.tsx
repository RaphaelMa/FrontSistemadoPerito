import React, { memo } from 'react'
import { colors } from '../Constants'
import { TaskType } from '../Types'
import { DraggableProvided } from 'react-beautiful-dnd'
import { TaskModalType } from 'Components/Modals/TaskModal/TaskModal'
import Content from './Content'
import styled from 'styled-components'

type Props = {
  task: TaskType,
  isDragging: boolean,
  provided: DraggableProvided,
  index: number,
  openTaskModal: TaskModalType['open'],
  column_id: string,
};

const Item: React.FC<Props> = (props: Props) => {
  const { task, isDragging, provided, index, openTaskModal } = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()

    openTaskModal(task._id)
  }

  return (
    <Container
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-index={index}
      onClick={handleClick}
    >
      <Content task={task}/>
    </Container>
  )
}

export default memo(Item)

const Container = styled.div<{ isDragging: boolean }>`
  display: flex;
  border-radius: 10px;
  border: 2px solid transparent;
  background-color: ${colors.N0};
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  transition: box-shadow 0.5s ease-in-out;
  box-sizing: border-box;
  padding: 10px;
  user-select: none;
  /* Top: 0
  /* Right: 5 + 9 de quando não tem a barra de rolagem
  /* Bottom: 10
  /* Left: 12 == 5 + 9, para ficar igual a marem na direita
  */
  margin: 0 5px 10px 14px;

  &:hover, &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }
`
