import React, { useMemo } from 'react'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import { ColumnsType } from 'antd/es/table'
import { Account } from './types'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<Account> => {
  return useMemo(() => ([
    {
      title: 'Nome',
      dataIndex: 'description',
      defaultSortOrder: 'ascend',
      sorter: true,
      ellipsis: true,
      key: 'description',
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 90,
      render: (status: Account) => (
        <>
          <Popconfirm
            title={<div>Tem certeza que deseja exluir essa conta?</div>}
            okText="Sim"
            cancelText="Não"
            okType="danger"
            placement="topLeft"
            onConfirm={() => handleDelete(status._id)}
          >
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
            />
          </Popconfirm>
          <Button
            type="text"
            icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
            onClick={() => handleEdit(status._id)}
          />
        </>
      ),
    },
  ]), [handleDelete, handleEdit])
}

export default useColumns
