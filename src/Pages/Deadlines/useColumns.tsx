import React, { useMemo, useCallback } from 'react'
import { Button, Tooltip } from 'antd'
import { theme } from 'Styles/theme'
import { DeadlineType } from './types'
import { ColumnsType } from 'antd/es/table'
import { currencyFormatter } from 'Utils/formatters'
import { EyeOutlined, ImportOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import moment from 'moment'

type UseColumnsProps = {
  type?: 'overdue' | 'done',
  openDeadlineModal: (id: string) => void
}

const useColumns = ({ openDeadlineModal, type }: UseColumnsProps) => {
  const orderDeadlines = useCallback((a: any, b: any, key: any) => {
    const value_a = a[key]
    const value_b = b[key]

    if (!value_a) return 1
    if (!value_b) return -1
    if (value_a < value_b) return -1
    if (value_a > value_b) return 1

    return 0
  }, [])

  return useMemo(() => {
    const common_columns: ColumnsType<any> = [
      {
        title: 'Número do Processo',
        key: 'processNumber',
        dataIndex: 'processNumber',
        ellipsis: true,
        sorter: (a, b) => orderDeadlines(a, b, 'processNumber')
      }, {
        title: 'Tipo de Prazo',
        dataIndex: 'deadeLine_description',
        key: 'deadeLine_description',
        sorter: (a, b) => orderDeadlines(a, b, 'deadLine_description'),
        ellipsis: true
      }, {
        title: 'Prazo',
        dataIndex: 'deadeLine_date',
        key: 'deadeLine_date',
        align: 'center',
        width: 130,
        defaultSortOrder: 'ascend',
        sorter: (a, b) => orderDeadlines(a, b, 'deadeLine_date'),
        render: (date) => date ? moment(date).format('DD/MM/YYYY') : null
      }, {
        title: 'Situação do Processo',
        dataIndex: 'situation_description',
        key: 'situation_description',
        sorter: (a, b) => orderDeadlines(a, b, 'situation_description'),
        ellipsis: true
      }, {
        title: 'Situação Financ. do Proc.',
        dataIndex: 'financialSituation_description',
        key: 'financialSituation_description',
        sorter: (a, b) => orderDeadlines(a, b, 'financialSituation_description'),
        ellipsis: true
      }, {
        title: 'Valor Honorário',
        dataIndex: 'honorary',
        key: 'honorary',
        ellipsis: true,
        sorter: (a, b) => orderDeadlines(a, b, 'honorary'),
        width: 130,
        align: 'right',
        render: (value) => currencyFormatter(value, { cents: true })
      }, {
        title: 'Ações',
        key: 'action',
        width: 90,
        align: 'center',
        render: (_, deadline: DeadlineType) => {
          return (
            <>
              <Button
                type="text"
                icon={<EyeOutlined style={{ color: theme.colors.primary }}/>}
                onClick={() => openDeadlineModal(deadline.process_id)}
              />

              <Tooltip title="Abrir o processo">
                <Button
                  type="text"
                  icon={<LinkIcon style={{ color: theme.colors.primary }}/>}
                  href={`/process/${deadline.process_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </Tooltip>
            </>
          )
        }
      }
    ]

    if (type === 'overdue') {
      const new_column = {
        title: 'Dias em Atraso',
        dataIndex: 'deadeLine_days',
        ellipsis: true,
        key: 'deadeLine_days',
        sorter: (a: any, b: any) => orderDeadlines(a, b, 'deadLine_days'),
        align: 'center',
        width: 130
      }

      // @ts-ignore
      common_columns.splice(3, 0, new_column)

      return common_columns
    }

    if (type === 'done') {
      const new_column = {
        title: 'Entregue Em',
        dataIndex: 'deadeLine_done',
        key: 'deadeLine_done',
        sorter: (a: any, b: any) => orderDeadlines(a, b, 'deadeLine_done'),
        align: 'center',
        width: 130,
        render: (date: string) => moment(date).format('DD/MM/YYYY')
      }

      // @ts-ignore
      common_columns.splice(3, 0, new_column)

      return common_columns
    }

    const new_column = {
      title: 'Dias Restantes',
      dataIndex: 'deadeLine_days',
      key: 'deadeLine_days',
      ellipsis: true,
      sorter: (a: any, b: any) => orderDeadlines(a, b, 'deadeLine_days'),
      width: 130,
      align: 'center'
    }

    // @ts-ignore
    common_columns.splice(3, 0, new_column)

    return common_columns
  }, [openDeadlineModal, orderDeadlines, type])
}

export default useColumns

const LinkIcon = styled(ImportOutlined)`
  transform: rotateZ(3.142rad);
  cursor: pointer;
`
