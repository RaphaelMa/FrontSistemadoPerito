import React, { useMemo } from 'react'
import { Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import { AnnotationType } from './types'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'

type UseColumnsProps = {
  handleDelete: (key: React.Key) => void,
  handleEdit: (key: React.Key) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<AnnotationType> => {
  return useMemo(() => ([
    {
      title: 'Data',
      dataIndex: 'annotationDate',
      defaultSortOrder: 'descend',
      key: 'annotationDate',
      width: 100,
      align: 'center',
      sorter: (a, b) => {
        if (a.annotationDate < b.annotationDate) return -1
        if (a.annotationDate > b.annotationDate) return 1

        return 0
      },
      render: (date) => {
        if (!date) return null

        return moment(date).utc().format('DD/MM/YYYY HH:mm')
      }
    },
    {
      title: 'Anotação',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 90,
      render: (annotation: AnnotationType) => (
        <>
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
            onClick={() => handleDelete(annotation.key)}
          />
          <Button
            type="text"
            icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
            onClick={() => handleEdit(annotation.key)}
          />
        </>
      ),
    },
  ]), [handleDelete, handleEdit])
}

export default useColumns
