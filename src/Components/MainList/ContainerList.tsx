import React from 'react'
import styled from 'styled-components'

const ContainerList: React.FC = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default ContainerList

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem;
`
