import React, { useMemo } from 'react'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import { ColumnsType } from 'antd/es/table'
import { DocumentType } from './Types'
import { useUserSelector } from 'Redux/UserReducer'
import moment from 'moment'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<DocumentType> => {
  const permissions = useUserSelector(state => state.permissions)

  return useMemo(() => ([
    {
      title: 'Data Criação',
      dataIndex: 'createAt',
      defaultSortOrder: 'ascend',
      sorter: true,
      width: 150,
      key: 'createAt',
      render: (date) => moment(date).format('DD/MM/YYYY')
    },
    {
      title: 'Última Atualização',
      dataIndex: 'updateAt',
      sorter: true,
      width: 160,
      align: 'center',
      key: 'updateAt',
      render: (date) => moment(date).format('DD/MM/YYYY')
    },
    {
      title: 'Título do Documento ',
      dataIndex: 'title',
      align: 'left',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 90,
      render: (document: DocumentType) => (
        <>
          {permissions?.document.delete && (
            <Popconfirm
              title={
                <>
                  <div>Tem certeza que deseja excluír o documento.</div>
                  <div>Deseja continuar?</div>
                </>
              }
              okText="Sim"
              cancelText="Não"
              okType="danger"
              placement="topLeft"
              onConfirm={() => handleDelete(document._id)}
            >
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              />
            </Popconfirm>
          )}

          {permissions?.document.update && (
            <Button
              type="text"
              icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
              onClick={() => handleEdit(document._id)}
            />
          )}
        </>
      ),
    },
  ]), [handleDelete, handleEdit, permissions])
}

export default useColumns
