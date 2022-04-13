import React, { memo } from 'react'
import { TaskType } from '../Types'
import DateTag from './DateTag'
import styled from 'styled-components'

type Props = {
  task: TaskType
}

// O conteúdo está separado, pois enquanto o item é movido ele é renderizado, desta
// forma evita de renderizar o conteúdo do item enquanto isso, melhorando a performance.
const Content: React.FC<Props> = ({ task }) => {

  return (
    <Container>
      <Header>
        {task.process_number}
      </Header>

      <Header>
        {task.title}
      </Header>

      <Description title={task.description}>
        {task.description}
      </Description>

      <Footer>
        <span>{task.user_name}</span>

        <DateTag task={task} date_format="DD [de] MMM"/>
      </Footer>
    </Container>
  )
}

export default memo(Content)

const Container = styled.div`
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
`

const Footer = styled.div`
  font-size: 15px;
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
`

const Header = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`

const Description = styled.div`
  font-size: 12px;
  min-height: 45px;
  max-height: 45px;
  line-height: 15px;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`
