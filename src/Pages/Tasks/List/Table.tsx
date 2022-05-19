import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import useColumns from './useColumns'
import { TablePaginationConfig } from 'antd/lib/table'
import { TaskType } from './useGetTasks'
import moment from 'moment'

type Props = {
  loading: boolean,
  tasks: TaskType[],
  handleTableChange?: (pagination: TablePaginationConfig, filter: any, sorter: any) => void,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  updateTaskFinished: (task: TaskType) => void,
}

const FinancialTable: React.FC<Props> = (props) => {
  const { loading, tasks, handleTableChange, handleDelete, handleEdit, updateTaskFinished } = props

  const columns = useColumns({ handleDelete, handleEdit, updateTaskFinished })

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
          rowExpandable: ({ description }) => !!description,
          expandedRowRender: ({ _id, description, createAt, deliveryDate }) => (
            <Details key={_id}>
              {!!description && (
                <div>
                  <Detail>
                    <Dot/>

                    <div>{description}</div>
                  </Detail>

                  {!!createAt && (
                    <Detail>
                      <Dot/>

                      <div>Data de criação: {moment(createAt).format('DD/MM/YYYY')}</div>
                    </Detail>
                  )}

                  {!!deliveryDate && (
                    <Detail>
                      <Dot/>

                      <div>Finalizado em: {moment(deliveryDate).format('DD/MM/YYYY')}</div>
                    </Detail>
                  )}
                </div>
              )}
            </Details>
          )
        }}
      />
    </TableContainer>
  )
}

export default FinancialTable

const StyledTable = styled(Table)`
  height: calc(100% - 40px);
  margin-left: 10px;
  margin-top: 15px;


  .ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
    height: 100%;
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

const TableContainer = styled.div`
  display: flex;
  margin: 0 -2rem 0 0;
  height: calc(100% - 42px);
`

const Details = styled.div`
  margin-left: 1rem !important;
  display: flex;
  flex-direction: column;
`

const Dot = styled.div`
  display: flex;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${p => p.theme.colors.primary};
  margin-right: 5px;
`

const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px;
`
