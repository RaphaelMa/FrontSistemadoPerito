/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { Space, Switch, Table, Button } from 'antd';
import styled from 'styled-components';
import { theme } from 'Styles/theme'
import { FeesType } from './types';
import TableContainer from 'Components/MainList/TableContainer'
import { TableLocale } from 'antd/es/table/interface'

import { ImportOutlined } from '@ant-design/icons';
import Axios from 'axios';
import useUpdatePushStatus from './useGetProcess'

import { useNavigate } from 'react-router-dom';
import { useUserSelector } from 'Redux/UserReducer';

const FeesTable: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null)

  const height = (divRef.current?.clientHeight || 0)

  const navigate = useNavigate()
  const [fees, setFees] = useState<FeesType[]>([]);
  const [updatePushStatus] = useUpdatePushStatus();
  const [processRedirect, setProcessRedirect] = useState();

  const { company } = useUserSelector(state => state)

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(company) {
      Axios.get(`https://backend-caiunaconta.herokuapp.com/dashboard?company_id=${company._id}`)
      .then((response) => {
        setFees(response.data)
      }); 
    } else {
      console.log('DEU RUIM AQUI!')
    }
  }, [company])

  const getProcessId = async (processNumber: string) => {
    const { data } = await updatePushStatus(processNumber)
    setProcessRedirect(data._id)

    if (data) {
      navigate(`/process/${data._id}`)
    } else {
      alert("Processo não encontrado no Sistema do Perito")
    }
  }

  const columns = [
    {
      title: 'Processo Judicial',
      dataIndex: 'processoJudicial',
      key: 'processoJudicial',
    },
    {
      title: 'Valor Ajustado',
      dataIndex: 'valorAjustado',
      key: 'valorAjustado',
    },
    {
      title: 'Status Pagamento',
      dataIndex: 'statusPayment',
      key: 'statusPayment',
    },
    {
      title: 'Ações',
      dataIndex: 'processoJudicial',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Switch 
            size="small"
          />
          <Button 
            style={{ border: 'none', backgroundColor: 'white'}} 
            onClick={() => getProcessId(record)}>
            <LinkIcon 
              style={{ color: theme.colors.primary }} 
            />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <TableContainer divRef={divRef}>
      <StyledTable
        scroll={{ y: height, x: 'max-content' }} 
        // style={{ flex: '1', width: '' }}
        style={{ border: '1px solid #d9d9d9', width: '98%', marginLeft: '2rem', marginTop: '5rem', overflow: 'auto'}}
        columns={columns}
        dataSource={fees}
      />
    </TableContainer>
  )
} 

export default FeesTable;

const LinkIcon = styled(ImportOutlined)`
  transform: rotateZ(3.142rad);
  cursor: pointer;
`

const StyledTable = styled(Table)`
  .ant-table-container, .ant-spin-nested-loading, .ant-table, .ant-spin-container {
    height: calc(100% - 75px);

    .ant-pagination {
      margin: 0 0 10px 0;
      margin-top: 0;
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

` as typeof Table
