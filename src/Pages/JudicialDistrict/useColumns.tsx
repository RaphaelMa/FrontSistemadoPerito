import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import React, { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { JudicialDistrictType } from './types'
import { useUserSelector } from 'Redux/UserReducer'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<JudicialDistrictType> => {
  const permissions = useUserSelector(state => state.permissions)

  return useMemo(() => ([
    {
      title: 'Comarca',
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
      render: ({ _id }: JudicialDistrictType) => (
        <>
          {permissions?.judicialdistrict.delete && (
            <Popconfirm
              title={
                <>
                  <div>A comarca será excluída de todos os processos em que está atrelada e suas varas também serão excluídas.</div>
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
                icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              />
            </Popconfirm>
          )}

          {permissions?.judicialdistrict.delete && (
            <Button
              type="text"
              icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
              onClick={() => handleEdit(_id)}
            />
          )}
        </>
      ),
    },
  ]), [handleDelete, handleEdit, permissions])
}

export default useColumns
