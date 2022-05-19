import React, { memo } from 'react'
import { TaskType } from '../Types'
import { colors } from '../Constants'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { isEqual } from 'lodash'
import { TaskModalType } from 'Components/Modals/TaskModal/TaskModal'
import Item from '../Task/Item'
import styled from 'styled-components'

const CONTAINER_MIN_HEIGHT: number = 150

type Props = {
  list_id: string,
  list_type: string,
  tasks: TaskType[],
  title?: string,
  openTaskModal: TaskModalType['open']
}

const List: React.FC<Props> = (props) => {
  const { list_id, tasks, title, list_type, openTaskModal } = props

  return (
    <Droppable droppableId={list_id} type={list_type} ignoreContainerClipping={true}>
      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
        <Wrapper {...dropProvided.droppableProps}>
          <ScrollContainer>
            <InnerList
              tasks={tasks}
              title={title}
              dropProvided={dropProvided}
              openTaskModal={openTaskModal}
              column_id={list_id}
            />
          </ScrollContainer>
        </Wrapper>
      )}
    </Droppable>
  )
}

type InnerListProps = {
  dropProvided: DroppableProvided,
  tasks: TaskType[],
  title?: string,
  openTaskModal: TaskModalType['open'],
  column_id: string,
}

const InnerList: React.FC<InnerListProps> = memo((props: InnerListProps) => {
  const { tasks, dropProvided, column_id, openTaskModal } = props;
  const title = props.title ? <Title>{props.title}</Title> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        {tasks.map((task: TaskType, index: number) => (
          <Draggable key={task._id} draggableId={task._id} index={index}>
            {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
              <Item
                key={task._id}
                task={task}
                isDragging={dragSnapshot.isDragging}
                provided={dragProvided}
                index={index}
                openTaskModal={openTaskModal}
                column_id={column_id}
              />
            )}
          </Draggable>
        ))}
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  )
}, isEqual)

// Não adicionar o isEqual pois senão quando a tarefa é alterada pelo modal não remove
// o item da lista
export default memo(List)

const Container = styled.div``;

const DropZone = styled.div`
  min-height: ${CONTAINER_MIN_HEIGHT}px;
  padding-bottom: 10px;
`

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: scroll; 
  /* 50px do header, 42px do header do board, 10 da margin das colunas, 50.5 do header da coluna, 12 da margin embaixo */
  max-height: calc(100vh - 50px - 42px - 10px - 50.5px - 12px);

  &::-webkit-scrollbar {
    width: 7px;               /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: transparent;        /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.colors.light_gray};    /* color of the scroll thumb */
    border-radius: 20px;       /* roundness of the scroll thumb */
  }

  /* Scrollbars in Firefox */
  scrollbar-width: thin;
  scrollbar-color: ${p => p.theme.colors.light_gray} ${colors.N30};
`

const Wrapper = styled.div`
  background-color: ${colors.N30};
  display: flex;
  flex-direction: column;
  border: 10px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 300px;
  padding-right: 2px; // Pra barra de rolagem não ficar colada
`

const Title = styled.h4`
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
`
