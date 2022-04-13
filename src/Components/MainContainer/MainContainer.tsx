import React from 'react'
import styled from 'styled-components'
import Logo, { SubtitleType } from './Logo'

type MainContainerProps = {
  logo_subtitle: SubtitleType
}

const MainContainer: React.FC<MainContainerProps> = ({ logo_subtitle, ...props }) => {
  return (
    <Container>
      <Content>
        <Logo subtitle={logo_subtitle}/>

        {props.children}
      </Content>
    </Container>
  )
}

export default MainContainer

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${p => p.theme.colors.dark_gray};
  background: white;
`

const Content = styled.div`
  width: ${window.innerWidth < 770 ? 80 : 50}vw;
`
