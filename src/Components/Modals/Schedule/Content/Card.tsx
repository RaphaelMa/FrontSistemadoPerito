import { Card, Divider } from 'antd'
import { FormInstance } from 'antd/lib/form'
import React from 'react'
import styled from 'styled-components'

type Props = {
  form: FormInstance,
  title: string,
  field_name: 'peoples' | 'activePole' | 'passivePole'
}

const CardComponent: React.FC<Props> = ({ form, title, field_name }) => {
  const { getFieldValue } = form

  const values = getFieldValue(['processData', field_name])

  return (
    <CardStyled>
      <Divider orientation="left">{title}</Divider>

      {values?.map((value: any) => {
        const information_line = `${value.kindPeople.kindPeople_description} - ${value.people.people_name}`

        return <Content title={information_line}>{information_line}</Content>
      })}
    </CardStyled>
  )
}

export default CardComponent

const CardStyled = styled(Card)`
  max-height: 25rem;
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
