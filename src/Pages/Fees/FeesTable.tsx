import React, { useEffect, useState } from 'react';
import { Space, Switch, Table } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'Styles/theme'
import { FeesType } from './types';
import { ImportOutlined } from '@ant-design/icons';
import Axios from 'axios';

const FeesTable = () => {
  const [fees, setFees] = useState<FeesType[]>([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/dashboard')
      .then((response) => {
        setFees(response.data)
      });  
  }, [])

  async function getProcessId(processNumber: string){
    const process = await Axios.get(`http://localhost:3333/caiunaconta?processNumber=${processNumber}`);
    console.log(process.data);
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
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Switch 
            size="small"
          />
          <button onClick={() => getProcessId('03000048620158240068')}>
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