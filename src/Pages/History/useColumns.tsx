import { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { HistoryType } from './types'
import moment from 'moment'

const useColumns = (): ColumnsType<HistoryType> => {
  return useMemo(() => ([
    {
      title: 'Data',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'center',
      width: 140,
      render: (createAt) => {
        if (!createAt) return null

        return moment(createAt).utc().format('DD/MM/YYYY HH:mm')
      }
    },
    {
      title: 'Ação',
      dataIndex: 'action',
      align: 'center',
      render: (action) => action.action_name
    },
    {
      title: 'Módulo',
      dataIndex: 'module',
      align: 'center',
      render: (module) => module.module_name
    },
    {
      title: 'Usuário',
      dataIndex: 'user',
      ellipsis: true,
      render: (user) => user.user_name
    },
    {
      title: 'Email',
      dataIndex: 'user',
      ellipsis: true,
      render: (user) => user.user_email
    },
    {
      title: 'Ações Realizadas',
      dataIndex: 'record',
      ellipsis: true,
      render: (record: HistoryType['record']) => record[0]?.description?.replace(/\\n/, '')
    },
  ]), [])
}

export default useColumns
