import useAxios from 'axios-hooks'
import { TaskType } from './Types'

type QueryPayload = {
  task: TaskType,
  success: true,
}

const useGetTask = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query =  (id: string) => execute({ url: `/taskcard/${id}` })

  return [query, { loading }] as const
}

export default useGetTask
