import React, { Suspense } from 'react'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'

// TODO: Criar um componente de loading decente
export const fallback = () => (
  <Container>
    <LoadingOutlined style={{ fontSize: '35px' }}/>
  </Container>
)

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  opacity: 1;
  pointer-events: none;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
`

const withSuspense = (Component: React.LazyExoticComponent<React.FC<{}>>, Fallback = fallback) => (
  <Suspense fallback={<Fallback />}>
    <Component />
  </Suspense>
)

export default withSuspense
