import React, { memo, useRef } from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { BillingType } from './types'
import styled from 'styled-components'

type Props = {
  columns: ColumnsType<BillingType>,
  data: BillingType[],
}

const RevenueTable: React.FC<Props> = ({ columns, data }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const height = (divRef.current?.clientHeight || 0) - 28

  return (
    <Container ref={divRef}>
      <StyledTable
        style={{ flex: 'auto', width: 0 }}
        className="header-align-center"
        columns={columns}
        dataSource={data}
        rowKey="_id"
        tableLayout="fixed"
        size="middle"
        bordered
        pagination={{
          showTotal: total => `${total} no total`,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '40', '50', '100'],
          hideOnSinglePage: true,
        }}
        scroll={{ y: height }}
        expandable={{
          rowExpandable: revenue => revenue.description.length > 0,
          expandedRowRender: revenue => (
            <HistoryItem key={revenue._id}>
              {revenue.description?.split(/\\n|\n/).map((description, index) => (
                <div key={`${index}-${revenue._id}`} className={index === 0 ? 'first' : 'extra-info'}>
                  {description}
                </div>
              ))}
            </HistoryItem>
          ),
        }}
      />
    </Container>
  )
}

export default memo(RevenueTable)

const Container = styled.div`
  display: flex;
  margin: 0;
  height: calc(100vh - 55px);
  width: 100%;
  max-width: 75%;
`

const StyledTable = styled(Table)`
  .ant-table-container, .ant-table, .ant-spin-nested-loading, .ant-spin-container {
    height: calc(100% - 26px);
    margin-left: -5%;
    margin-right: 2%;
  }

  .ant-table-pagination.ant-pagination {
    margin: 40px 6px 16px 0;
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
    margin-right: 3px;
  }

  div.first {
    display: inline;
  }

  div.extra-info {
    display: block;
    margin-left: 20px;
  }
`
