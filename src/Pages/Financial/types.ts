export type GeneralFinancial = {
  total: number,
  receive: number,
  pay: number,
}

export type FinancialType = {
  _id?: string,
  paymentDate?: string | null,
  financialAccount_id?: string,
  financialAccount_description?: string,
  isPaid: boolean,
  discount: number,
  total?: number,
  process_id?: string,
  process_number?: string,
  people_id?: string,
  people_name?: string,
  observation: string,
  expirationDate: string,
  movement_id?: string,
  movement_description?: string,
  movement_key?: string,
  category_id?: string,
  category_description?: string,
  value: number,
}