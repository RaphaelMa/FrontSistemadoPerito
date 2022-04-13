import React from 'react'
import MainContainer from 'Components/MainContainer/MainContainer'
import RegisterForm from './RegisterForm'
import useFacebookPixel from '../../Utils/useFacebookPixel'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Register: React.FC = () => {
  useFacebookPixel()

  return (
    <MainContainer logo_subtitle="Informe seus dados para realizar o cadastro">
      <RegisterForm/>

      <BackButton to="/login">Voltar para o login</BackButton>
    </MainContainer>
  )
}


export default Register

const BackButton = styled(Link)`
  margin-top: 16px;
  text-align: center;
  color: ${p => p.theme.colors.primary};
  text-decoration: underline;
`
