import React from 'react'
import LoginForm from './LoginForm'
import styled from 'styled-components'

import image_background from 'Assets/login_background.png'
import logo from 'Assets/LogoV2.png'
import SuporteIcon from './Components/SuporteIcon'

const Login: React.FC = () => {
  return (
    <Container>
      <LeftContainer>
        <FormContainer>
          <Logo src={logo}/>

          <Text style={{ color: '#00FECD', marginTop: 32 }}>JÁ TEM CADASTRO?</Text>
          <Text style={{ color: 'white', marginBottom: 32 }}>Acesse com seus dados</Text>

          <LoginForm/>
        </FormContainer>
      </LeftContainer>

      <RightContainer style={{ backgroundImage: `url(${image_background})` }}/>
      <SuporteIcon />
    </Container>
  )
}

export default Login

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
`

const LeftContainer = styled.div`
  width: 50vw;
  height: 100vh;
  background-color: #01383D;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    width: 100vw;
    
    padding: 16px;
    
    image {
      text-align: center;
    }
  }
`

const RightContainer = styled.image`
  display: flex;
  position: relative;
  align-items: flex-start;
  overflow-x: hidden;
  justify-content: center;
  min-height: 100vh;
  width: 50vw;
  background-position: center;
  background-size: cover;

  @media (max-width: 767px) {
    display: none;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: auto;
`

const Logo = styled.img`
  width: 188px;
  height: 74px;

  @media (max-width: 767px) {
    width: 220px;
    height: 90px;
    align-self: center;
  }
`

const Text = styled.div`
  font-size: 20px;

  @media (max-width: 767px) {
    align-self: center;
  }
`
