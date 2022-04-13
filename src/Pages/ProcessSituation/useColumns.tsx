import React, { useMemo } from 'react'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import { ProcessSituationType } from './types'
import { ColumnsType } from 'antd/es/table'
import { useUserSelector } from 'Redux/UserReducer'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<ProcessSituationType> => {
  const permissions = useUserSelector(state => state.permissions)

  return useMemo(() => ([
    {
      title: 'Descrição',
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
      render: (situation: ProcessSituationType) => (
        <>
          {permissions?.processSituation.delete && (
            <Popconfirm
              title={
                <>
                  <div>A situação será excluída de todos os processos em que esta atrelada.</div>
                  <div>Deseja continuar?</div>
                </>
              }
              okText="Sim"
              cancelText="Não"
              okType="danger"
              placement="topLeft"
              onConfirm={() => handleDelete(situation._id)}
            >
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              />
            </Popconfirm>
          )}
          {permissions?.processSituation.update && (
            <Button
              type="text"
              icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
              onClick={() => handleEdit(situation._id)}
            />
          )}
        </>
      ),
    },
  ]), [handleDelete, handleEdit, permissions])
}

export default useColumns
