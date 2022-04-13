import React, { memo } from 'react'
import { Table } from 'antd'
import { HistoryType } from './types'
import styled from 'styled-components'
import useColumns from './useColumns'

type HistoryTableProps = {
  data: HistoryType[],
  loading: boolean,
  divRef: React.RefObject<HTMLDivElement>,
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data, loading, divRef }) => {
  const columns = useColumns()

  const height = (divRef.current?.clientHeight || 0) - 40

  return (
    <StyledTable
      style={{ flex: 'auto', width: 0 }}
      className="header-align-center"
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
      tableLayout="fixed"
      size="middle"
      bordered
      pagination={{
        hideOnSinglePage: true,
        showTotal: total => `${total} no total`,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '40', '50', '100']
      }}
      scroll={{ y: height }}
      expandable={{
        rowExpandable: history => history.record.length > 0,
        expandedRowRender: history => {
          return (
            history.record.map((record, index) => (
              <HistoryItem key={index}>
                {record.description?.split(/\\n|\n/).map((description, index) => (
                  <div key={`${index}-${record._id}`}
                       className={index === 0 ? 'first' : 'extra-info'}>{description}</div>
                ))}
              </HistoryItem>
            ))
          )
        }
      }}
    />
  )
}

export default memo(HistoryTable)

const StyledTable = styled(Table)`
  .ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
    height: calc(100% - 48px);
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

const HistoryItem = styled.p`
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${p => p.theme.colors.primary};
    margin-right: 5px;
  }

  div.first {
    display: inline;
  }

  div.extra-info {
    display: block;
    margin-left: 20px;
  }
`
