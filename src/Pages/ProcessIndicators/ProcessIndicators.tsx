import React from 'react'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Situation from './Situation'

const ProcessIndicators: React.FC = () => {


  return (
    <Container>
      <Sidebar />

      <div style={{ flex: 1, padding: 20 }}>
        <Routes>
          <Route path="/situation"  element={<Situation type="situation" />}/>
          <Route path="/financial-situation"  element={<Situation type="financial-situation" />}/>
        </Routes>
      </div>
    </Container>
  )
}

export default ProcessIndicators

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`
