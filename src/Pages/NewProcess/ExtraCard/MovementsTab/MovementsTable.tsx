import React, { useState, useMemo } from 'react'
import { Table } from 'antd'
import { MovementType } from './types'
import { ExpandableConfig } from 'antd/es/table/interface'
import useColumns from './useColumns'
import styled from 'styled-components'

type Props = {
  movements?: MovementType[],
}

const MovementTable: React.FC<Props> = ({ movements }) => {
  const [expanded_rows, setExpandedRows] = useState<React.ReactText[]>([])

  const expandable = useMemo(() => {
    const config: ExpandableConfig<MovementType> = {
      expandedRowKeys: expanded_rows,
      onExpandedRowsChange: setExpandedRows,
      rowExpandable: () => true,
      expandedRowRender: () => null
    }

    return config
  }, [expanded_rows])

  const columns = useColumns({ expanded_rows })

  return (
    <StyledTable
      size="middle"
      tableLayout="fixed"
      dataSource={movements}
      columns={columns}
      bordered
      rowKey="_id"
      expandable={expandable}
    />
  )
}

export default MovementTable

const StyledTable = styled(Table)`
  .ant-table-thead {
    th {
      text-align: center;
    }
  }

  .ant-table-expanded-row {
    display: none;
  }
` as typeof Table
