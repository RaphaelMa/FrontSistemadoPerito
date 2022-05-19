import { Row, Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { TableLocale } from 'antd/es/table/interface'
import { Key } from 'antd/lib/table/interface'
import TableContainer from 'Components/MainList/TableContainer'
import React, { memo, useRef } from 'react'
import styled from 'styled-components'
import { FiltersType } from 'Utils/functions'
import ExpandedCard from './ExpandedCard'
import { ProcessType } from './types'

type Props = {
  columns: ColumnsType<ProcessType>,
  filtered_data: ProcessType[],
  loading: boolean,
  filters: FiltersType,
  handleTableChange: (
    pagination: TablePaginationConfig,
    filter: Record<string, Key[] | null>,
    sorter: any
  ) => void,
  locale: TableLocale,
}

const ProcessTable: React.FC<Props> = ({ columns, filtered_data, loading, filters, handleTableChange, locale }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const height = (divRef.current?.clientHeight || 0)

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
          pageSize: filters.pagination.page_size,
          total: filtered_data.length,
          current: filters.pagination.current_page,
          pageSizeOptions: ['10', '20', '40', '50', '100']
        }}
        expandable={{
          rowExpandable: ({ peoples, activePole, passivePole }) =>
            (!!peoples?.length || !!activePole?.length || !!passivePole?.length),
          expandedRowRender: ({ _id, peoples, activePole, passivePole }) => (
            <Row justify="space-between">
              <ExpandedCard title="Pessoas" data={peoples}/>
              <ExpandedCard title="Polo Ativo" data={activePole}/>
              <ExpandedCard title="Polo Passivo" data={passivePole}/>
            </Row>
          )
        }}
        locale={locale}
        scroll={{ y: height, x: 'max-content' }}
      />
    </TableContainer>
  )
}

export default memo(ProcessTable)

const StyledTable = styled(Table)`
  .ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
    height: calc(100% - 80px);

    .ant-pagination {
      margin: 0 0 10px 0;
      margin-top: 0;
    }
  }

  .ant-table-thead {
    th {
      text-align: center;
    }
  }

  .ant-table-body {
    height: 100%;
  }

` as typeof Table
