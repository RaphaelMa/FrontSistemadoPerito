import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import React, { useMemo } from 'react'
import * as Types from './types'
import { ColumnsType } from 'antd/es/table'
import { UserType } from './types'
import { useUserSelector } from 'Redux/UserReducer'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<UserType> => {
  const permissions = useUserSelector(state => state.permissions)

  return useMemo(() => ([
    {
      title: 'Nome',
      dataIndex: 'name',
      defaultSortOrder: 'ascend',
      sorter: true,
      ellipsis: true,
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tipo do usuário',
      dataIndex: 'kindUser',
      key: 'kindUser',
      render: (kindUser) => kindUser?.kindUser_description
    },
    {
      title: 'Atuando Como',
      dataIndex: 'professional',
      key: 'professional',
      render: (professional) => professional?.professional_description
    },
    {
      title: 'Área de Atuação',
      dataIndex: 'areaDescription',
      key: 'areaDescription',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active) => active ? 'Ativo' : 'Desativado'
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 90,
      render: (person: Types.UserType) => (
        <>
          {permissions?.user.delete && (
            <Popconfirm
              title={
                <>
                  <div>O usuário será excluído de todas as informações em que esta atrelado.</div>
                  <div>Deseja continuar?</div>
                </>
              }
              okText="Sim"
              cancelText="Não"
              okType="danger"
              placement="topLeft"
              onConfirm={() => handleDelete(person._id)}
            >
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              />
            </Popconfirm>
          )}
          {permissions?.user.update && (
            <Button
              type="text"
              icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
              onClick={() => handleEdit(person._id)}
            />
          )}
        </>
      ),
    },
  ]), [handleDelete, handleEdit, permissions])
}

export default useColumns
