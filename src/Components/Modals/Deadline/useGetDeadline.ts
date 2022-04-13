import useAxios from 'axios-hooks'
import { DeadlineType } from './types'

type QueryType = {
  message: DeadlineType,
  success: boolean,
}

const useGetProcessData = () => {
  const [{ loading }, getData] = useAxios<QueryType>({ method: 'GET' }, { manual: true })

  const fetchData = (process_id: string) => getData({ url: `/deadline/${process_id}` })

  return [loading, fetchData] as const
}

export default useGetProcessData
