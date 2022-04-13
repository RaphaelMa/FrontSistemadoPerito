import React, { useMemo } from 'react'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import { ColumnsType } from 'antd/es/table'
import { CategoryType } from './types'
import { useUserSelector } from 'Redux/UserReducer'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<CategoryType> => {
  const permissions = useUserSelector(state => state.permissions)

  return useMemo(() => ([
    {
      title: 'Nome',
      dataIndex: 'description',
      defaultSortOrder: 'ascend',
      sorter: true,
      ellipsis: true,
      key: 'description',
    }, {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 90,
      render: (category: CategoryType) => (
        <>
          {permissions?.financial.delete && (
            <Popconfirm
              title={
                <>
                  <div>A categoria será excluída de todas as movimentações em que esta atrelada.</div>
                  <div>Deseja continuar?</div>
                </>
              }
              okText="Sim"
              cancelText="Não"
              okType="danger"
              placement="topLeft"
              onConfirm={() => handleDelete(category._id)}
            >
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              />
            </Popconfirm>
          )}

          {permissions?.financial.update && (
            <Button
              type="text"
              icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
              onClick={() => handleEdit(category._id)}
            />
          )}
        </>
      ),
    },
  ]), [handleDelete, handleEdit, permissions])
}

export default useColumns
