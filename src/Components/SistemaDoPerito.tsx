import { Button } from 'antd'
import styled from 'styled-components'

// Componente com vários componentes estilizados
export const UnstyledButton = styled(Button)`
  background: none;
  border: none;
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
  padding: 0;
  transition: color .1s;

  &:hover {
    color: ${p => p.theme.colors.dark_gray};
  }

  &:focus {
    outline: none;
  }
`
