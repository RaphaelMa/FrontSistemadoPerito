import React from 'react'
import { message, Table } from 'antd'
import styled from 'styled-components'
import useColumns from './useColumns'
import messageError from 'Utils/messageError'
import { useDestroyFinancial, useSaveFinancial, QueryPayload } from './useHelpers'
import { FinancialType, GeneralFinancial } from './types'
import moment from 'moment'
import { TablePaginationConfig } from 'antd/lib/table'
import { FinancialDrawerType } from 'Components/Drawers/Financial/FinancialDrawer'
import { currencyFormatter } from 'Utils/formatters'

type Props = {
  loading: boolean,
  financials: FinancialType[],
  setFinancials: React.Dispatch<React.SetStateAction<FinancialType[]>>,
  setGeneralFinancial?: React.Dispatch<React.SetStateAction<GeneralFinancial>>,
  handleTableChange: (pagination: TablePaginationConfig, filter: any, sorter: any) => void,
  handleOpenDrawer: FinancialDrawerType['open'],
  afterSave: (data: QueryPayload) => void,
  header_height: number,
}

const FinancialTable: React.FC<Props> = (props) => {
  const { loading, financials, header_height, setFinancials, setGeneralFinancial, handleTableChange, handleOpenDrawer, afterSave } = props

  const [saveFinancial] = useSaveFinancial()
  const [destroyMutation] = useDestroyFinancial()

  const handleDelete = async (financial: FinancialType) => {
    try {
      const { data } = await destroyMutation(financial._id!)

      if (!data?.success) {
        message.error(data.message)
        return
      }

      setFinancials((prev) => prev.filter(f => f._id !== financial._id))
      setGeneralFinancial?.(data.generalFinancial)
    } catch (e) {
      messageError('202012172321')
    }
  }

  const handleMovementPress = async (financial: FinancialType, action: 'edit' | 'destroy' | 'action') => {
    if (action === 'edit') {
      handleOpenDrawer(financial._id)
    } else if (action === 'destroy') {
      await handleDelete(financial)
    } else {
      try {
        const { data } = await saveFinancial({
          ...financial,
          isPaid: !financial.isPaid,
          paymentDate: financial.isPaid ? null : moment().format('YYYY-MM-DD')
        })

        if (!data?.success) {
          message.error(data.message)
          return
        }

        afterSave(data)
      } catch (e) {
        messageError('202012172244')
      }
    }
  }

  const columns = useColumns({ handleMovementPress })

  function loopPartials(installmentsList: any): any{
    let parcelas: JSX.Element[] = [];
    installmentsList.map((installment: { _id: string | null | undefined,  installment_id: string, installment_value: number }) => {
      parcelas.push(
        <Detail key={installment._id}>
          <Dot />
          <div>{installment.installment_id}x - {currencyFormatter(installment.installment_value, { cents: true })}</div>
        </Detail>
      );
    })
    return parcelas;
  }

  return (
    <TableContainer $header_height={header_height}>
      <StyledTable
        style={{ flex: 'auto', width: 0 }}
        className="header-align-center"
        columns={columns}
        dataSource={financials}
        rowKey="_id"
        tableLayout="fixed"
        size="middle"
        loading={loading}
        bordered
        onChange={handleTableChange}
        pagination={{
          showTotal: total => `${total} no total`,
          showSizeChanger: true,
          defaultPageSize: 20,
          pageSizeOptions: ['10', '20', '40', '50', '100']
        }}
        scroll={{ y: 2000 }}
        expandable={{
          rowExpandable: ({ porcentReceptiValue, totalRecepetValue }) => (!!porcentReceptiValue || !!totalRecepetValue),
          expandedRowRender: ({ _id, porcentReceptiValue, totalRecepetValue, installmentsList }) => (
            <Details key={_id}>
              <p><b>Parcelas:</b></p>
              {loopPartials(installmentsList)}
            </Details>
          )
        }}
      />
    </TableContainer>
  )
}

export default FinancialTable

const StyledTable = styled(Table)`

.ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
  height: calc(100% - 44px);

    .ant-pagination {
      margin: 0 0 10px 0;
      margin-top: 20px;
    }
  }

  .ant-table-thead {
    th {
      text-align: center;
    } 
  }

  .ant-table-body {
    height: 100%;
  }

  .ant-pagination > li {
    z-index: 100;
  } 
  /* height: calc(100% - 80px);

  .ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
    height: 100%;
  }

  .ant-table-thead {
    th {
      text-align: center;
    }
  }

  .ant-table-body {
    height: 100%;
    padding-bottom: 3%;
  }

  .ant-pagination {
    margin: 10px 10px 10px 20px;
    margin-top: 30px;
    margin-bottom: 30%;

    background-color: white;
  }

  .ant-pagination > li {
    z-index: 100;
    padding-bottom: 10%;
  } */
` as typeof Table

const TableContainer = styled.div<{ $header_height: number }>`
  display: flex;
  margin: 0 -2rem 0 0;
  height: calc(100% - ${p => p.$header_height}px);
`

const Details = styled.div`
  margin-left: 1rem !important;
  display: flex;
  flex-direction: column;
`

const Dot = styled.div`
  display: flex;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${p => p.theme.colors.primary};
  margin-right: 5px;
`

const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 5px;
`
