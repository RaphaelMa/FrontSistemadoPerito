import React from 'react'
import styled from 'styled-components'

const SuporteIcon: React.FC = () => {
  return (
   <Container>
        <a href="https://front-suporte-perito.herokuapp.com/" target='blank'>
            <h4 style={{ color: '#000', marginTop: '26px', marginLeft: '8px'}}>Suporte</h4>
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
    background-color: rgb(0, 254, 205);;
    color: #000;

    margin-top: 42%;
    margin-left: 2%;

    border: 2px solid #FFF;

    cursor: pointer;

    box-shadow: 12px 14px 34px -2px #000000;
`;