import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import React, { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { PersonKindType } from './types'
import { useUserSelector } from 'Redux/UserReducer'

type UseColumnsProps = {
  destroying: boolean,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ destroying, handleDelete, handleEdit }: UseColumnsProps): ColumnsType<PersonKindType> => {
  const permissions = useUserSelector(state => state.permissions)

  return useMemo(() => ([
    {
      title: 'Tipo Pessoa',
      dataIndex: 'description',
      defaultSortOrder: 'ascend',
      sorter: true,
      key: 'description',
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 90,
      render: ({ _id }: PersonKindType) => (
        <>
          {permissions?.kindPeople.delete && (
            <Popconfirm
              title={
                <>
                  <div>O tipo de pessoa será excluída de todos os processos em que está atrelada.</div>
                  <div>Deseja continuar?</div>
                </>
              }
              okText="Sim"
              cancelText="Não"
              okType="danger"
              placement="topLeft"
              onConfirm={() => handleDelete(_id)}
            >
              <Button
                type="text"
                loading={destroying}
                icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              />
            </Popconfirm>
          )}

          {permissions?.kindPeople.update && (
            <Button
              type="text"
              icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
              onClick={() => handleEdit(_id)}
            />
          )}
        </>
      ),
    },
  ]), [handleDelete, handleEdit, destroying, permissions])
}

export default useColumns
