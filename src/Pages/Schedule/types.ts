import { Moment } from 'moment'

export type Content = {
  _id: string
  hour: string
  status: 'Aguardando' | 'Realizado' | 'Cancelado',
  color: string
  processNumber: string
  expertName?: string | null,
  expertiseDate: string,
  place?: string | null,
  deadLineDescription: string,
}

export type Month = {
  date: Moment,
  content: Content[],
}

export type Status = { [key: string]: 'warning' | 'success' | 'error' }
