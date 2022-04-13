import React from 'react'
import logo from 'Assets/logo_cinza.svg'
import styled from 'styled-components'

export type SubtitleType = string | JSX.Element

type LogoProps = {
  subtitle: SubtitleType,
}

const Logo: React.FC<LogoProps> = ({ subtitle }) => (
  <LogoContainer>
    <LogoImg src={logo} alt="Logomarca"/>
    <Subtitle>
      {subtitle}
    </Subtitle>
  </LogoContainer>
)

export default Logo

const LogoContainer = styled.div`
  text-align: center;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`

const LogoImg = styled.img`
  height: 7rem;
`

const Subtitle = styled.h3`
  color: ${p => p.theme.colors.light_gray};
  font-size: 16px;
  margin-top: 10px;
`
