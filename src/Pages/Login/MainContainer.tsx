import React from 'react'
import styled from 'styled-components'
import Logo from 'Components/MainContainer/Logo'

type MainContainerProps = {
  logo_subtitle: string
}

const MainContainer: React.FC<MainContainerProps> = ({ logo_subtitle, ...props }) => {
  return (
    <Content>
      <Logo subtitle={logo_subtitle}/>

      {props.children}
    </Content>
  )
}

export default MainContainer

const Content = styled.div`
  width: ${window.innerWidth < 770 ? 80 : 50}%;
`
