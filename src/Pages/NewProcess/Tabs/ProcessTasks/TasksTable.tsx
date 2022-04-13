import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import useColumns from './useColumns'
import { TablePaginationConfig } from 'antd/lib/table'
import { TaskType } from './useGetProcessTasks'
import moment, { defaultFormat } from 'moment'

export type TableProps = {
  loading: boolean,
  tasks: TaskType[],
  handleAction: (action: 'destroy' | 'edit' | 'action', task: TaskType) => void
  handleTableChange: (pagination: TablePaginationConfig, filter: any, sorter: any) => void,
}

const TasksTable: React.FC<TableProps> = (props) => {
  const { loading, tasks, handleTableChange, handleAction } = props

  const columns = useColumns(handleAction)

  return (
    <TableContainer>
      <StyledTable
        style={{ flex: 'auto', width: 0 }}
        className="header-align-center"
        columns={columns}
        dataSource={tasks}
        rowKey="_id"
        tableLayout="fixed"
        size="middle"
        loading={loading}
        bordered
        onChange={handleTableChange}
        pagination={{
          showTotal: total => `${total} no total`,
          showSizeChanger: true,
          defaultPageSize: 20,
          pageSizeOptions: ['10', '20', '40', '50', '100']
        }}
        scroll={{ y: 2000 }}
        expandable={{
          rowExpandable: ({ description, createdAt, deliveryDate }) => (!!description || !!createdAt || !!deliveryDate),
          expandedRowRender: ({ description, createdAt, deliveryDate }) => (
            <Details>
              {description && renderExpandedItem(description)}

              {createdAt && (
                renderExpandedItem(`Data de Criação: ${moment(createdAt, defaultFormat).format('DD/MM/YYYY')}`)
              )}

              {deliveryDate && (
                renderExpandedItem(`Data de Criação: ${moment(deliveryDate, defaultFormat).format('DD/MM/YYYY')}`)
              )}
            </Details>
          )
        }}
      />
    </TableContainer>
  )
}

export default TasksTable

const StyledTable = styled(Table)`
  height: calc(100% - 40px);

  .ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
    height: 100%;
  }

  .ant-table-thead {
    th {
      text-align: center;
    }
  }

  .ant-table-body {
    height: calc(100% - 40px);
  }
` as typeof Table

const renderExpandedItem = (description: string) => (
  <Item>
    <Dot/> <span>{description}</span>
  </Item>
)

const TableContainer = styled.div`
  display: flex;
  margin: 0 -2rem 0 0;
  height: calc(100% - 96px);
`

const Details = styled.div`
  margin-left: 1rem !important;
  display: flex;
  flex-direction: column;
`

const Dot = styled.div`
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${p => p.theme.colors.primary};
  margin-right: 5px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px;
`
