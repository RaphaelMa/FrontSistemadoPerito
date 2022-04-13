import React, { useMemo } from 'react'
import { MovementType } from './types'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import styled, { css } from 'styled-components'

type Props = {
  expanded_rows: React.ReactText[]
}

const useColumns = ({ expanded_rows }: Props): ColumnsType<MovementType> => {
  return useMemo(() => ([
    {
      title: 'Data',
      dataIndex: 'movementDate',
      defaultSortOrder: 'descend',
      key: 'movementDate',
      width: 100,
      align: 'center',
      sorter: (a, b) => {
        if (a.movementDate < b.movementDate) return -1
        if (a.movementDate > b.movementDate) return 1

        return 0
      },
      render: (date) => {
        if (!date) return null

        return moment(date).utc().format('DD/MM/YYYY')
      }
    },{
      title: 'Palavra Chave',
      dataIndex: 'keyWords',
      key: 'keyWords',
      width: 150,
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      render: (description, record) => {
        const is_expanded = expanded_rows.some(row => row === record._id)

        return (
          <Container is_expanded={is_expanded}>{description}</Container>
        )
      }
    },
  ]), [expanded_rows])
}

export default useColumns

const ellipsis_css = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
`

const Container = styled.div<{ is_expanded: boolean }>`
  ${p => !p.is_expanded && ellipsis_css}
`
