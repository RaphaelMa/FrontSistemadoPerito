import { Data, Prices } from './types'

const RESOURCES = [
  'Usuários',
  'Pushs Grátis',
  'Dahsboard',
  'Gestão de Perícias e Assistências',
  'Gestão da Agenda',
  'Cadastros',
  'Relatórios',
  'Gestão de Tarefas',
  'Anexo de arquivos',
  'Gestão Financeira',
  'Criação de Documentos',
  'Gestão de Pessoas',
  'Automação de Tarefas',
]

const START = [1, 5, true, true, true, true, true, false, false, false, false, false, false]
const BASIC = [2, 10, true, true, true, true, true, true, true, false, false, false, false]
const PRO = [4, 20, true, true, true, true, true, true, true, true, true, false, false]
const ENTERPRISE = [6, 40, true, true, true, true, true, true, true, true, true, true, true]

type Functions = {
  prices: Prices,
}

export const buildData = ({ prices }: Functions): Data[] => {
  const data: Data[] = []

  for (let i = 0; i < 13; i++) {
    data.push({
      key: String(i),
      resource: RESOURCES[i],
      start: START[i],
      basic: BASIC[i],
      pro: PRO[i],
      enterprise: ENTERPRISE[i],
    })
  }

  data.push({
    key: '13',
    resource: '',
    ...prices,
  })

  return data
}

export const YEARLY_PRICE = {
  start: 7640,
  basic: 15290,
  pro: 22940,
  enterprise: 38242,
}

export const MONTHLY_PRICE = {
  start: 8990,
  basic: 17990,
  pro: 26990,
  enterprise: 44990,
}
