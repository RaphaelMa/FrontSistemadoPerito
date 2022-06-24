import React, { useEffect, useState } from 'react';
import { Space, Switch, Table, Button } from 'antd';
import styled from 'styled-components';
import { theme } from 'Styles/theme'
import { FeesType } from './types';
import { ImportOutlined } from '@ant-design/icons';

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
        <Button
          type="text"
          icon={<LinkIcon style={{ color: theme.colors.primary }}/>}
          target="_blank"
          rel="noopener noreferrer"
        />
      </Space>
    ),
  },
];

const FeesTable = () => {
  const [fees, setFees] = useState<FeesType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/dashboard")
      .then(response => response.json())
      .then(data => {
        console.log(data)
      setFees(data)
    })
  }, [fees])

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