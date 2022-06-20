import React, { useMemo, useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Button, Popconfirm, Switch, Tag, Modal } from 'antd'
import { FinancialType } from './types'
import moment, { defaultFormat } from 'moment'
import { currencyFormatter } from 'Utils/formatters'
import styled from 'styled-components'
import { DeleteOutlined, EditOutlined, WalletOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'

type Props = {
  handleMovementPress: (financial: FinancialType, action: 'edit' | 'destroy' | 'action') => void
}

const useColumns = ({ handleMovementPress }: Props): ColumnsType<FinancialType> => {
  // const [isModalVisible, setIsModalVisible] = useState(false);

  // // Setando dados do modal para parcelas
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // }; 

  // const onChange = (checked: any) => {
  //   console.log(`switch to ${checked}`);
  // };

  return useMemo(() => ([
    {
      title: 'Vencimento',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      sorter: true,
      defaultSortOrder: 'ascend',
      align: 'center',
      width: 110,
      render: (expirationDate: string) => moment(expirationDate, defaultFormat).format('DD/MM/YYYY')
    },
    {
      title: 'Pagamento',
      dataIndex: 'paymentDate',
      align: 'center',
      width: 110,
      render: (payment: string) => (
        moment(payment).isValid() ? moment(payment, defaultFormat).format('DD/MM/YYYY') : null
      )
    },
    {
      title: 'Conta',
      dataIndex: 'financialAccount_description',
      align: 'center',
    },
    {
      title: 'Nº do Processo',
      dataIndex: 'process_number',
      align: 'center'
    },
    {
      title: 'Categoria',
      dataIndex: 'category_description',
      align: 'center',
      ellipsis: true
    },
    {
      title: 'Movimentação',
      dataIndex: 'movement_description',
      align: 'center',
      width: 120,
      render: (movement_description) => (
        <Tag color={movement_description === 'Receber' ? 'green' : 'red'}>
          {movement_description}
        </Tag>
      )
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      width: 120,
      align: 'center',
      render: (value: string) => currencyFormatter(value, { cents: true })
    },
    {
      title: 'Desconto',
      dataIndex: 'discount',
      align: 'center',
      width: 120,
      render: (value: string) => currencyFormatter(value, { cents: true })
    },
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'center',
      width: 120,
      render: (value: string) => currencyFormatter(value, { cents: true })
    },
    {
      title: 'Qtd. Parcelas',
      dataIndex: 'porcentReceptiValue',
      align: 'center',
      width: 120,
      // render: (value: number) => (value, { cents: true })
    },
    {
      title: 'A Receber Parcelado',
      dataIndex: 'recepetPartial',
      align: 'center',
      width: 120,
      render: (value: string) => currencyFormatter(value, { cents: true })
    },
    {
      title: 'Valores por Parcelas',
      dataIndex: 'totalRecepetValue',
      align: 'center',
      width: 120,
      render: (value: string) => currencyFormatter(value, { cents: true })
    },
    {
      title: 'Ações',
      align: 'center',
      width: 140,
      render: (_, financial: FinancialType) => (
        <ActionsContainer>
          {/* <Modal
            title="Detalhamento de Valores das Parcelas"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}>
              <GridContainer>
                <Installments>
                  <h2>1</h2>
                </Installments>
                <Installments style={{ marginLeft: '-6rem'}}>
                  <h2>08/06/2022</h2>
                </Installments>
                <Installments>
                  <h2>R$ 200,00</h2>
                </Installments>
                <Installments>
                  <Switch
                    defaultChecked
                    onChange={onChange}
                    style={{ marginLeft: '10rem'}}
                  />
                </Installments>
              </GridContainer>
          </Modal> */}
          <Popconfirm
            title={
              <>
                <div>A movimentação será excluída</div>
                <div>Deseja continuar?</div>
              </>
            }
            okText="Sim"
            cancelText="Não"
            okType="danger"
            placement="topLeft"
            onConfirm={() => handleMovementPress(financial, 'destroy')}
          >
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
            />
          </Popconfirm>

          <Button
            type="text"
            icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
            onClick={() => handleMovementPress(financial, 'edit')}
          />

          {/* <Button
            type="text"
            icon={<WalletOutlined style={{ color: theme.colors.primary }}/>}
            onClick={showModal}
          /> */}
          
          <Switch
            onChange={() => handleMovementPress(financial, 'action')}
            style={{ marginLeft: 5, marginTop: 6 }}
            size="small"
            checked={financial.isPaid}
          />
        </ActionsContainer>
      )
    }
  ]), [handleMovementPress])
}

export default useColumns

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(12, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`

const Installments = styled.div``
