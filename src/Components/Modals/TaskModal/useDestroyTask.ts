import useAxios from 'axios-hooks'
import { TaskType } from './Types'

type QueryPayload = {
  success: boolean,
  task: TaskType
}

const useDestroyTask = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/taskcard/${id}` })

  return [mutation, { loading }] as const
}

export default useDestroyTask
