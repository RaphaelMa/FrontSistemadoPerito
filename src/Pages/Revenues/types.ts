export type Status = {
  status_id: string,
  status_description: string,
  status_key: string,
}

export type Payment = {
  typePayment_id: string,
  typePayment_description: string,
  typePayment_key: string,
}

export type PartialMonthly = {
  period: string,
  valueTotal: number,
  arrayDescription: string[],
}

export type BillingType = {
  _id: string,
  __v: number,
  status: Status,
  typePayment: Payment,
  payDate: string,
  dueDate: string,
  description: string,
  value: number,
  url_external_billet: string,
  url_external_nfe?: string,
}

export type RevenuesType = {
  billing: BillingType[],
  partialMonthly: PartialMonthly,
  success?: boolean,
  message?: string,
}
