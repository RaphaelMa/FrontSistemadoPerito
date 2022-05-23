import React, { memo } from 'react'
import { colors } from '../Constants'
import { TaskType } from '../Types'
import { isEqual } from 'lodash'
import { Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { TaskColumnModalType } from 'Components/Modals/TaskColumn/TaskColumnModal'
import { TaskModalType } from 'Components/Modals/TaskModal/TaskModal'
import List from './List'
import styled from 'styled-components'

type Props = {
  column_id: string,
  title: string,
  tasks: TaskType[],
  index: number,
  openColumnModal: TaskColumnModalType['open'],
  deleteColumn: (id: string) => void,
  openTaskModal: TaskModalType['open']
}

const Column: React.FC<Props> = (props) => {
  const { title, tasks, column_id, openColumnModal, deleteColumn, openTaskModal } = props

  return (
    <Container>
      <Header>
        <Title aria-label={`${title} task list`} title={title}>
          {title}
        </Title>
        <div style={{ minWidth: 64 }}>
          <StyledButton onClick={() => openColumnModal(column_id, title)} type="text" icon={<EditIcon/>}/>
          <Popconfirm
            title={
              <div>
                <p>Tem certeza que deseja excluir a coluna?</p>
                <p>Todas as tarefas da coluna serão excluídas.</p>
              </div>
            }
            onConfirm={() => deleteColumn(column_id)}
            placement="bottomRight"
            okText="Sim"
            cancelText="Não"
          >
            <StyledButton type="text" icon={<DeleteIcon/>}/>
          </Popconfirm>
        </div>
      </Header>
      <List list_id={column_id} list_type="TASKS" tasks={tasks} openTaskModal={openTaskModal}/>
    </Container>
  )
}

export default memo(Column, isEqual)
const Container = styled.div`
  margin: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.N30};
`

const Title = styled.h4`
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const EditIcon = styled(EditOutlined)`
  color: ${p => p.theme.colors.primary};
`

const DeleteIcon = styled(DeleteOutlined)`
  color: ${p => p.theme.colors.red};
`

const StyledButton = styled(Button)`
  background: transparent;

  &:hover, &:focus {
    background: transparent;
  }
`
