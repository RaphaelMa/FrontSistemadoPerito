export type Plan = {
  _id: string,
  name: string
}

export type PlanContentType = number | boolean

export type Data = {
  key: string,
  resource: string,
  start: PlanContentType,
  basic: PlanContentType,
  pro: PlanContentType,
  enterprise: PlanContentType,
}

export type Prices = {
  start: number,
  basic: number,
  pro: number,
  enterprise: number,
}
