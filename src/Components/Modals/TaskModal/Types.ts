import { Moment } from "moment"

export type TaskType = {
  _id: string,
  finished: boolean,
  title: string,
  column_id: string,
  column_description: string,
  process_id?: string,
  process_number?: string,
  user_id?: string,
  user_name?: string,
  description?: string,
  deliveryDate: string,
  finishedDate?: string | null,
  createAt?: string,
}

export type TaskFormType = {
  _id?: string,
  finished: boolean,
  title: string,
  column_id: string,
  column_description: string,
  process_id: string,
  process_number: string,
  user_name: string,
  user_id: string,
  description: string,
  deliveryDate: Moment,
  finishedDate?: Moment,
  createAt?: Moment,
}
