import React, { useMemo } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Tag, Tooltip } from 'antd'
import { BillingType, Payment, Status } from './types'
import moment, { defaultFormat } from 'moment'
import { currencyFormatter } from 'Utils/formatters'
import styled from 'styled-components'
import Boleto from 'Assets/boleto.png'
import Nfe from 'Assets/nfe.png'

const useColumns = (): ColumnsType<BillingType> => {
  return useMemo(() => ([
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 90,
      render: (status: Status) => (
        <Tag color={status.status_description === 'Pago' ? 'green' : 'orange'}>
          {status.status_description}
        </Tag>
      ),
    },
    {
      title: 'Vencimento',
      dataIndex: 'dueDate',
      align: 'center',
      width: 100,
      render: (dueDate: string) => moment(dueDate, defaultFormat).format('DD/MM/YYYY'),
    },
    {
      title: 'Pagamento',
      dataIndex: 'payDate',
      align: 'center',
      width: 100,
      render: (payment: string) => (
        moment(payment).isValid() ? moment(payment, defaultFormat).format('DD/MM/YYYY') : null
      )
    },
    {
      title: 'Forma de Pagamento',
      dataIndex: 'typePayment',
      align: 'center',
      width: 160,
      ellipsis: true,
      render: (payment: Payment) => payment.typePayment_description,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      align: 'center',
      width: 100,
      render: (value: number) => currencyFormatter(value),
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      align: 'center',
      ellipsis: true,
      render: (description: string) => description.split('\r\n')[0],
    },
    {
      title: 'Ações',
      align: 'center',
      width: 80,
      render: ({ url_external_billet, url_external_nfe }) => {

        return (
          <ActionsContainer>
            {url_external_billet && (
              <Tooltip title="Abrir boleto">
                <a target="_blank" rel="noopener noreferrer" href={url_external_billet}>
                  <Image src={Boleto} alt="Boleto"/>
                </a>
              </Tooltip>
            )}
            {url_external_nfe && (
              <Tooltip title="Abrir nota fiscal">
                <a target="_blank" rel="noopener noreferrer" href={url_external_nfe}>
                  <Image src={Nfe} alt="NF-e"/>
                </a>
              </Tooltip>
            )}
          </ActionsContainer>
        )
      },
    },
  ]), [])
}

export default useColumns

const ActionsContainer = styled.div`
  display: block;
`

const Image = styled.img`
  width: 30px;
  height: 20px;
  object-fit: contain;
`
