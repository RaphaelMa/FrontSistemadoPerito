const COLORS = {
  primary: '#3CA49E',
  dark_gray: '#353A41',
  light_gray: '#5A6978',
  red: '#FF4D4F',
  yellow: '#FFDA55',
  orange: '#FFCA00',
  link: '#1890ff',
  white: '#FFF',
}

export type ThemeType = {
  colors: typeof COLORS
}

export const theme: ThemeType = {
  colors: COLORS
}
