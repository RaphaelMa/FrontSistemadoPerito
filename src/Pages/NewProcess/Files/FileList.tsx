import React from 'react'
import { Table } from 'antd'
import { FileType } from './FilesCard'
import styled from "styled-components"
import useColumns from './useColumns'

type Props = {
  loading: boolean,
  files: FileType[],
  onDelete: (id: string) => void
}

const FilesList: React.FC<Props> = ({ files, loading, onDelete }) => {
  const columns = useColumns({ handleDelete: onDelete })

  return (
    <Container>
      <StyledTable
        loading={loading}
        size="middle"
        columns={columns}
        dataSource={files}
        pagination={false}
        bordered
        rowKey="id"
      />
    </Container>
  )
}

export default FilesList

const Container = styled.ul`
  margin-top: 20px;
`

const StyledTable = styled(Table)`
  .ant-table-thead {
    th {
      text-align: center;
    }
  }
` as typeof Table
