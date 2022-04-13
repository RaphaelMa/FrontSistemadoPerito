import { Card, Divider } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { GenericType } from './types'

type Props = {
  title: string,
  data?: GenericType[]
}

const ExpandedCard: React.FC<Props> = ({ title, data }) => {
  return (
    <CardStyled>
      <Divider orientation="left">{title}</Divider>

      {data?.map(people => {
        const line_content = `${people.kindPeople.kindPeople_description} - ${people.people.people_name}`

        return <Content title={line_content} key={people._id}>{line_content}</Content>
      })}
    </CardStyled>
  )
}

export default ExpandedCard

const CardStyled = styled(Card)`
  max-height: 40rem;
  overflow-x: auto;
  width: 33%;

  .ant-card-body {
    padding: 1.4rem;
  }

  .ant-divider.ant-divider-horizontal {
    margin-top: 0;
  }
`

const Content = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
`
