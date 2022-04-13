import React from 'react'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import { Button } from 'antd'
import { useNavigate } from 'react-router'
import * as animation from 'Assets/animations/rocket.json'

const Page: React.FC = () => {
  const navigate = useNavigate()

  const default_options = ({
    loop: false,
    autoplay: true,
    // @ts-ignore
    animationData: animation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  })

  return (
    <Container>
      <Text>
        Seu plano não possui esse módulo! Faça upgrade no seu plano!
      </Text>
      <Lottie width={350} height={350} options={default_options}/>
      <Button onClick={() => navigate('/plans')} type="primary">Planos</Button>
    </Container>
  )
}

export default Page

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
`

const Text = styled.span`
  display: block;
  font-size: 24px;
  margin-bottom: 10px;
`
