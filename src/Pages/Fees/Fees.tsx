import React, { useEffect } from 'react';
import { Input, Select } from 'antd';
import styled from 'styled-components';

import FeesTable from './FeesTable';
const { Option } = Select;

const Fees: React.FC = () => {

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  
  return (
    <>
      <Container>
        <Warpper>
          <Input type="text" placeholder="Informe o número do processo" />
        </Warpper>
        <Warpper>
        <Select
          defaultValue="pago"
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="pago">Pago</Option>
          <Option value="naopago">Não Pago</Option>
        </Select>
        
        <Select
          defaultValue="ajg"
          style={{
            width: 120,
            paddingLeft: 20
          }}
          onChange={handleChange}
        >
          <Option value="ajg">AJG</Option>
        </Select>
        </Warpper>

      </Container>
      <ContainerFees>
        <FeesTable />
      </ContainerFees>
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

const ContainerFees = styled.div`
  margin-top: 20px;
  height: 100%;
  width: 100%;
  padding: 2rem;
`