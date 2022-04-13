import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import React, { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { JudicialDistrictLevelType } from './types'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<JudicialDistrictLevelType> => {
  return useMemo(() => ([
    {
      title: 'Vara',
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
      render: ({ _id }: JudicialDistrictLevelType) => (
        <>
          <Popconfirm
            title={
              <>
                <div>A vara será excluída de todos os processos em que está atrelada e desvinculada da comarca.</div>
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

          <Button
            type="text"
            icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
            onClick={() => handleEdit(_id)}
          />
        </>
      ),
    },
  ]), [handleDelete, handleEdit])
}

export default useColumns
