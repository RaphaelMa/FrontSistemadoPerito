import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import React, { useMemo } from 'react'
import * as Types from './types'
import { ColumnsType } from 'antd/es/table'
import { PersonType } from './types'
import { phoneFormatter, documentFormatter } from 'Utils/formatters'
import moment from 'moment'
import { useUserSelector } from 'Redux/UserReducer'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
}

const useColumns = ({ handleDelete, handleEdit }: UseColumnsProps): ColumnsType<PersonType> => {
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
      title: 'Documento',
      dataIndex: 'document',
      sorter: true,
      width: 150,
      align: 'center',
      key: 'document',
      render: (document) => documentFormatter(document)
    },
    {
      title: 'E-mail comercial',
      dataIndex: 'businessEmail',
      key: 'businessEmail',
      ellipsis: true,
    },
    {
      title: 'E-mail pessoal',
      dataIndex: 'personalEmail',
      key: 'personalEmail',
      ellipsis: true,
    },
    {
      title: 'Contato Comercial',
      dataIndex: 'businessContact',
      key: 'businessContact',
      align: 'center',
      width: 140,
      render: (phone) => phoneFormatter(phone)
    },
    {
      title: 'Contato Pessoal',
      dataIndex: 'personalContact',
      key: 'personalContact',
      align: 'center',
      width: 140,
      render: (phone) => phoneFormatter(phone)
    },
    {
      title: 'Aniversário',
      dataIndex: 'birthday',
      key: 'birthday',
      align: 'center',
      width: 100,
      render: (birthday) => {
        if (!birthday) return null

        return moment(birthday, 'YYYY/MM/DD').format('DD/MM/YYYY')
      }
    },
    {
      title: 'Agencia Bancaria',
      dataIndex: 'agency',
      align: 'center',
      width: 100,
      key: 'agency',
    },
    {
      title: 'Conta Bancaria',
      dataIndex: 'bankAccount',
      align: 'center',
      width: 100,
      key: 'bankAccount',
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 90,
      render: (person: Types.PersonType) => (
        <>
          {permissions?.people.delete && (
            <Popconfirm
              title={
                <>
                  <div>A pessoa será excluída de todos os processos em que esta atrelada.</div>
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
          {permissions?.people.update && (
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
