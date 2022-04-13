import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <ContainerStyled>
      {children}
    </ContainerStyled>
  )
}

export default Container

const ContainerStyled = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 40px;
  height: calc(100% - 5rem);
`
