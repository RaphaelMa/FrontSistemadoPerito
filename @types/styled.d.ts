import 'styled-components'
import { ThemeType } from 'Styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
