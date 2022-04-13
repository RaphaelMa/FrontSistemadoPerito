import moment from "moment"

const LOCALE = 'pt-BR'
const CURRENCY = 'BRL'

type CurrencyFormatter = (value?: string | number, options?: { cents?: boolean }) => string

export const currencyFormatter: CurrencyFormatter = (raw_value, options = {}) => {
  const { cents = false } = options
  const formatter = new Intl.NumberFormat(LOCALE, {
    style: 'currency', currency: CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2,
  })

  let value = parseFloat(`${raw_value}`) || 0
  if (cents) value /= 100.0

  const DEFAULT_FORMAT = { group: '.', decimal: ',' }

  return formatter.formatToParts(value).map(({ type, value }) => {
    if (type in DEFAULT_FORMAT) return DEFAULT_FORMAT[(type as keyof typeof DEFAULT_FORMAT)]

    return value
  }).reduce((string, part) => string + part)
}

export const currencyParser = (raw_value: string) => (
  parseInt((raw_value || '0').replace(/[^\d]/g, ''))
)

export const phoneFormatter = (phone?: string | number) => {
  if (!phone) return ''

  phone = phone.toString()
  phone = phone.replace(/\D/g, '')
  phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2')

  return phone.replace(/(\d)(\d{4})$/, '$1-$2')
}

export const documentFormatter = (document?: string | number) => {
  if (!document) return ''

  document = document.toString()
  document = document.replace(/\D/g, '')
  if (document.length >= 14) {
    return document.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d)/g, '$1.$2.$3/$4-$5')
  }

  return document.replace(/^(\d{3})(\d{3})(\d{3})(\d)/g, '$1.$2.$3-$4')
}

type NumberFormatter = (
  number: number,
  options?: { precision?: number, group_separator?: '.' | ',', decimal_separator?: '.' | ',' },
) => string

/**
 * Função para formatar número.
 * @param {number} number - Número para ser formatado.
 * @param {Object} options - Opções extras que podem ser informadas.
 * @param {number} options.precision - Precisão do número formatado. Valor padrão é 2.
 * @param {string} options.group_separator - Separador de agrupamento. Valor padrão é '.'.
 * @param {string} options.decimal_separator - Separador decimal. Valor padrão é ','.
 */

export const numberFormatter: NumberFormatter = (number, options = {}) => {
  const { precision = 2, group_separator = '.', decimal_separator = ',' } = options
  const formatter = new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  })

  return formatter.formatToParts(number).map(({ type, value }) => {
    switch (type) {
      case 'group':
        return group_separator
      case 'decimal':
        return decimal_separator
      default:
        return value
    }
  }).reduce((string, part) => string + part)
}

type PercentageFormatter = (
  value: number | string,
  options?: {
    symbol_position?: 'left' | 'right', precision?: number, group_separator?: '.' | ',', decimal_separator?: '.' | ','
  },
) => string

/**
 * Função para formatar número para porcentagem.
 * @param {number | string} raw_value - Número para ser formatado.
 * @param {Object} options - Opções extras que podem ser informadas.
 * @param {number} options.precision - Precisão do número formatado. Valor padrão é 2.
 * @param {string} options.symbol_position - Posição do simbolo. Valor padrão é 'left'.
 * @param {string} options.group_separator - Separador de agrupamento. Valor padrão é '.'.
 * @param {string} options.decimal_separator - Separador decimal. Valor padrão é ','.
 */

export const percentageFormatter: PercentageFormatter = (raw_value, options = {}) => {
  const { symbol_position = 'left', precision = 2, group_separator = '.', decimal_separator = ',' } = options
  const value = parseFloat(`${raw_value}`) || 0

  const prefix = symbol_position === 'left' ? '% ' : ''
  const suffix = symbol_position === 'right' ? '%' : ''
  const number = numberFormatter(value, { precision, group_separator, decimal_separator })

  return `${prefix}${number}${suffix}`
}

export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)


const MOMENT_FORMAT = 'YYYY/MM/DD'
const DEFAULT_FORMAT = 'DD/MM/YYYY'

export const renderDate = (date?: string | null) => date ? moment(date, MOMENT_FORMAT).format(DEFAULT_FORMAT) : undefined
