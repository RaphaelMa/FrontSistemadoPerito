import useAxios from "axios-hooks"

export type TaskType = {
  title: string,
  column_description: string,
  process_number?: string,
  user_name?: string,
  description: string,
  deliveryDate: string,
  finishedDate?: string | null,
  finished: boolean,
  _id: string,
  createAt: string,
  column_id: string,
  process_id?: string,
  user_id?: string,
}

type DataPayload = {
  task: TaskType[],
}

const useGetTasks = () => (
  useAxios<DataPayload>({ url: `/task/mode=table`, method: 'GET' }, { manual: true })
)

export default useGetTasks
