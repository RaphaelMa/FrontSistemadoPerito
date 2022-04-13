import React from 'react'
import styled from 'styled-components'
import { Result } from 'antd'

const NoFound: React.FC = () => {
  return (
    <Container>
      <Text>
        Este link não existe
      </Text>
      <Result status="404"/>
    </Container>
  )
}

export default NoFound

const Container = styled.div`
  width: 100%;
  height: 90%;
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
