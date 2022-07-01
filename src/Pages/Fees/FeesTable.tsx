import React, { useEffect, useState } from 'react';
import { Space, Switch, Table } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'Styles/theme'
import { FeesType } from './types';
import { ImportOutlined } from '@ant-design/icons';
import Axios from 'axios';
import useUpdatePushStatus from './useGetProcess'
import useGetCompany from './useGetCompany'

import { Navigate, useNavigate } from 'react-router-dom';

const FeesTable = () => {
  const navigate = useNavigate()
  const [fees, setFees] = useState<FeesType[]>([]);
  const [updatePushStatus] = useUpdatePushStatus();
  const [processRedirect, setProcessRedirect] = useState();

  useEffect(() => {
    const company_id = '5f897e6a57f2261d750282cb'
    Axios.get(`http://localhost:3001/dashboard?company_id=${company_id}`)
      .then((response) => {
        setFees(response.data)
      });  
  }, [])

  async function getProcessId(processNumber: string){
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
          <button onClick={() => getProcessId(record)}>
            <LinkIcon style={{ color: theme.colors.primary }} />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table 
        style={{ border: '1px solid #d9d9d9'}}
        columns={columns}
        dataSource={fees}
      />
    </>
  )
} 

export default FeesTable;

const LinkIcon = styled(ImportOutlined)`
  transform: rotateZ(3.142rad);
  cursor: pointer;
`