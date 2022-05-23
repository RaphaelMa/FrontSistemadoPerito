import React from 'react'
import styled from 'styled-components'

const SuporteIcon: React.FC = () => {
  return (
   <Container>
        <a href="https://front-suporte-perito.herokuapp.com/" target='blank'>
            <Title style={{ color: '#FFF', marginTop: '26px', marginLeft: '8px'}}>SUPORTE</Title>
        </a>
   </Container>
  )
}

export default SuporteIcon

const Container = styled.div`
    position: absolute;
    width: 80px;
    font-size: 16px;

    font-family: Arial, Helvetica, sans-serif;

    height: 80px;
    border-radius: 50%;
    background-color: #01383d;
    color: #000;

    margin-top: 42%;
    margin-left: 2%;

    border: 2px solid #00fecd;

    cursor: pointer;

    box-shadow: 12px 14px 34px -2px #000000;
`;

const Title = styled.h4`
  color: #fff;
  margin-top: 28px;
  margin-left: 7px;
  font-size: 13px;
`;