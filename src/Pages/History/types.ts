type RecordType = {
  _id: string,
  description: string,
}

export type HistoryType = {
  module: {
    module_id: string,
    module_name: string
  },
  user: {
    user_id: string,
    user_name: string,
    user_email: string
  },
  action: {
    action_id: string,
    action_name: string
  },
  _id: string,
  createAt: string,
  record: RecordType[]
}

export type ChangedFiltersType = 'dates' | 'user_id' | 'action_id' | 'module_id'
