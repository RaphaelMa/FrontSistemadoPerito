import useAxios from "axios-hooks"

export type TaskType = {
  _id: string,
  finished: boolean,
  process_number: string,
  user_name: string,
  description: string,
  deliveryDateTask: string,
  createdAt?: string,
  updatedAt?: string,
  finishedDate?: string,
  deliveryDate?: string,
  title: string,
  column: string,
  column_description: string,
  process_id: string,
  user_id: string
}

type DataPayload = {
  message?: TaskType[],
  success?: boolean,
}

const useGetTasks = (id: string) => (
  useAxios<DataPayload>(
    {
      url: `/processtabs/module=task/id=${id}`,
      method: 'GET'
    },
    { manual: true }
  )
)

export default useGetTasks
