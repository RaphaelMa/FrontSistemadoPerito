import React, { memo, useRef } from 'react'
import { Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { FiltersType } from 'Utils/functions'
import { ProcessFinancialSituationType } from './types'
import { Key } from 'antd/lib/table/interface'
import { TableLocale } from 'antd/es/table/interface'
import styled from 'styled-components'
import TableContainer from 'Components/MainList/TableContainer'

type TableProps = {
  columns: ColumnsType<ProcessFinancialSituationType>,
  filtered_data: ProcessFinancialSituationType[],
  loading: boolean,
  filters: FiltersType,
  handleTableChange: (
    pagination: TablePaginationConfig,
    filter: Record<string, Key[] | null>,
    sorter: any,
  ) => void,
  locale: TableLocale,
}

const ProcessFinancialSituationTable: React.FC<TableProps> = ({ columns, filtered_data, loading, filters, handleTableChange, locale }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const height = (divRef.current?.clientHeight || 0) - 40

  return (
    <TableContainer divRef={divRef}>
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
        pagination={{
          showTotal: total => `${total} no total`,
          showSizeChanger: true,
          pageSize: filters!.pagination!.page_size,
          total: filtered_data.length,
          current: filters!.pagination!.current_page,
          pageSizeOptions: ['10', '20', '40', '50', '100'],
        }}
        locale={locale}
        scroll={{ y: height }}
      />
    </TableContainer>
  )
}

export default memo(ProcessFinancialSituationTable)

const StyledTable = styled(Table)`
  .ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
    height: calc(100% - 48px);
  }

  .ant-table-body {
    height: 100%;
  }
` as typeof Table
