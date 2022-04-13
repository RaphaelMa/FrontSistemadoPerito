declare module 'readable-size' {
  // Tem mais opções para mapear, mas como só precisei desta não fiz.
  const readableSize: (size: number) => string

  export = readableSize
}
