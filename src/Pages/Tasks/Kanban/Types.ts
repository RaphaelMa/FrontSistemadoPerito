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
}

export type ColumnType = {
  column_id: string,
  order: number,
  description: string,
  tasks: TaskType[],
}

export type FiltersType = {
  start_date?: string,
  end_date?: string,
  user_id?: string,
  process_id?: string,
  column_id?: string,
  finished?: boolean,
}
