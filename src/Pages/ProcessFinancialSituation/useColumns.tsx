import React, { useMemo } from 'react'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import { ProcessFinancialSituationType } from './types'
import { ColumnsType } from 'antd/es/table'
import { useUserSelector } from 'Redux/UserReducer'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<ProcessFinancialSituationType> => {
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
      render: (financial_situation: ProcessFinancialSituationType) => (
        <>
          {permissions?.processFinancialSituation.delete && (
            <Popconfirm
              title={
                <>
                  <div>A situação financeira será excluída de todos os processos em que está atrelada.</div>
                  <div>Deseja continuar?</div>
                </>
              }
              okText="Sim"
              cancelText="Não"
              okType="danger"
              placement="topLeft"
              onConfirm={() => handleDelete(financial_situation._id)}
            >
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              />
            </Popconfirm>
          )}
          {permissions?.processFinancialSituation.update && (
            <Button
              type="text"
              icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
              onClick={() => handleEdit(financial_situation._id)}
            />
          )}
        </>
      ),
    },
  ]), [handleDelete, handleEdit, permissions])
}

export default useColumns
