import React, { RefObject } from 'react'
import styled from 'styled-components'

type TableContainerProps = {
  divRef: RefObject<HTMLDivElement>
}

const TableContainer: React.FC<TableContainerProps> = ({ divRef, ...props }) => (
  <Container {...props} ref={divRef}>
    {props.children}
  </Container>
)

export default TableContainer

const Container = styled.div`
  display: flex;
  margin: 0 -2rem 0 0;
  height: 100%;
`
