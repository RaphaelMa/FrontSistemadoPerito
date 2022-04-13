import React from 'react'
import styled from 'styled-components'
import { Result } from 'antd'

const Page: React.FC = () => {
  return (
    <Container>
      <Text>
        Você não possui acesso!
      </Text>
      <Text>
        Entre em contato com o adminstrador do sistema!
      </Text>
      <Result status="403"/>
    </Container>
  )
}

export default Page

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
`

const Text = styled.span`
  display: block;
  font-size: 24px;
  margin-bottom: 16px;
`
