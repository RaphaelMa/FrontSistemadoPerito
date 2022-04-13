import React from 'react'
import { Table } from 'antd'
import { AnnotationType } from './types'
import useColumns from './useColumns'

type Props = {
  annotations?: AnnotationType[],
  handleDelete: (key: React.Key) => void,
  handleEdit: (key: React.Key) => void,
}


const AnnotationTable: React.FC<Props> = ({ annotations, handleDelete, handleEdit }) => {
  const columns = useColumns({ handleDelete, handleEdit })

  return (
    <Table
      size="middle"
      dataSource={annotations}
      columns={columns}
      bordered
    />
  )
}

export default AnnotationTable
