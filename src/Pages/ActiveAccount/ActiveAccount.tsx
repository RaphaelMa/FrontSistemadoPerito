import React from 'react'
import MainContainer from 'Components/MainContainer/MainContainer'
import styled from 'styled-components'
import ActiveAccountForm from './ActiveAccountForm'

type Props = {}

const ActiveAccount: React.FC<Props> = () => (
  <MainContainer
    logo_subtitle={
      <TextContainer>
        <p>Verifique seu e-mail</p>
        <p>Dentro de alguns minutos você receberá um código para ativar sua conta!</p>
      </TextContainer>
    }
  >
    <ActiveAccountForm/>
  </MainContainer>
)

export default ActiveAccount

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 17px;
`
