import useAxios from 'axios-hooks'
import { ColumnType } from './Types'

type Payload = {
  success: boolean,
  task: ColumnType[]
}

const useGetPerson = () => {
  const [{ loading, data }, execute] = useAxios<Payload>({ method: 'GET', url: '/task/mode=kanban' }, { manual: true })

  const query =  () => execute()

  return [{ loading, data }, query] as const
}

export default useGetPerson
