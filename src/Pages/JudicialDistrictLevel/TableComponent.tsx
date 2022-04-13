import React, { memo, useRef } from 'react'
import { Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { JudicialDistrictLevelType } from './types'
import { Key } from 'antd/lib/table/interface'
import { TableLocale } from 'antd/es/table/interface'
import styled from 'styled-components'

type KindPersonTableProps = {
  columns: ColumnsType<JudicialDistrictLevelType>,
  filtered_data: JudicialDistrictLevelType[],
  loading: boolean,
  handleTableChange: (
    _pagination: TablePaginationConfig,
    _filter: Record<string, Key[] | null>,
    sorter: any,
  ) => void,
  locale: TableLocale,
}

const TableComponent: React.FC<KindPersonTableProps> = ({ columns, filtered_data, loading, handleTableChange, locale }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const height = (divRef.current?.clientHeight || 0) - 1

  return (
    <TableContainer ref={divRef}>
      <StyledTable
        style={{ flex: 'auto', width: 0 }}
        columns={columns}
        dataSource={filtered_data}
        loading={loading}
        onChange={handleTableChange}
        rowKey="_id"
        tableLayout="fixed"
        size="middle"
        bordered
        locale={locale}
        scroll={{ y: height }}
        pagination={{
          hideOnSinglePage: true
        }}
      />
    </TableContainer>
  )
}
export default memo(TableComponent)

const StyledTable = styled(Table)`
  .ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
    height: calc(100% - 10px);
  }

  .ant-table-body {
    height: 100%;
  }
` as typeof Table

const TableContainer = styled.div`
  display: flex;
  height: 100%;
`
