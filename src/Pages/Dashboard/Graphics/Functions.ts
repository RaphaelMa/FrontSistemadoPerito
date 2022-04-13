export const GRAPHICS_FONT = "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"

type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export const useGraphicFontSize = (breakpoints: Partial<Record<Breakpoint, boolean>>) => {
  if (breakpoints['xxl']) return 24
  if (breakpoints['xl']) return 20
  if (breakpoints['lg']) return 18
  if (breakpoints['md']) return 16

  return 24
}
