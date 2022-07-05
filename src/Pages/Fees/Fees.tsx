import React, { ChangeEvent, useEffect, useState } from 'react';
import { Input, Select, Button } from 'antd';
import styled from 'styled-components';
import Axios from 'axios';


import Table from './FeesTable';
const { Option } = Select;

const Fees: React.FC = () => {
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Container>
        <Warpper>
          <Input 
            type="text" 
            placeholder="Informe o número do processo"
          />
        </Warpper>
        <Warpper>
        <Select
          defaultValue="PAGO"
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="PAGO">Pago</Option>
          <Option value="NÃO PAGO">Não Pago</Option>
        </Select>
        
        <Select
          defaultValue="KEY-ROLE-AJG"
          style={{
            width: 120,
            paddingLeft: 20
          }}
          onChange={handleChange}
        >
          <Option value="KEY-ROLE-AJG">AJG</Option>
          <Option value="KEY-ROLE-EPROC">E-PROC</Option>
        </Select>
        </Warpper>

      </Container>
      <Table />
    </>
  );
}

export default Fees;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 0px;

  margin-left: 2rem;
`;

const Warpper = styled.div``;

// const ContainerFees = styled.div`
//   margin-top: 20px;
//   height: 100%;
//   width: 100%;
//   padding: 2rem;
// `