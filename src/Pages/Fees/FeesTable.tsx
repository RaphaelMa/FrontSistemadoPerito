import React from 'react';
import 'antd/dist/antd.css';
import { Space, Switch, Table } from 'antd';
const columns = [
  {
    title: 'Id',
    dataIndex: 'Id',
    key: 'Id',
    render: (text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => <a>{text}</a>,
  },
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
    render: (_: any, record: { name: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined; }) => (
      <Space size="middle">
       <Switch />
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const FeesTable = () => <Table columns={columns} dataSource={data} />;

export default FeesTable;