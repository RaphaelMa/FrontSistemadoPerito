export type FinancialType = {
  _id?: string,
  expirationDate: string,
  paymentDate?: string,
  isPaid: boolean,
  movement_id: string,
  category_id: string,
  movement_description?: string,
  value: number,
  discount: number,
  process_id: string,
  people_id: string,
  observation: string,
  financialAccount_id?: string,
  financialAccount_description?: string
}

export type FinancialCategory = {
  _id: string,
  description: string,
}

export type GeneralFinancial = {
  pay: number,
  receive: number,
  total: number,
}
