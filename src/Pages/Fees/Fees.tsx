import React, {useState, useEffect} from 'react';
import { Input, Select, Button, Switch } from 'antd';
import styled from 'styled-components';
import { FeesType } from './types';
// import useGetFees from './useGetFees';
import FeesTable from './FeesTable';
const { Option } = Select;

const Fees: React.FC = () => {
  const [fees, setFees] = useState<FeesType[]>([]);

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  
  const onChange = (checked: any) => {
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    fetch("http://localhost:3001/dashboard")
      .then(response => response.json())
      .then(data => {
        console.log(data)
      setFees(data)
    })
  }, [])
  
  
  return (
    <ContainerFees>

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
        </Warpper>
        <Warpper style={{ marginLeft: '20rem'}}>
          <Button type="primary">Buscar</Button>
        </Warpper>
      </Container>
        <FeesTable />
    </ContainerFees>
  );
}

export default Fees;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 0px;

  margin-left: 4rem;
`;

const Warpper = styled.div``;

const ContainerFees = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
`