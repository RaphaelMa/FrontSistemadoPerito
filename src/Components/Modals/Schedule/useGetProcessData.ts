import useAxios from 'axios-hooks'
import { ProcessType } from './types'
import { AxiosPromise } from 'axios'

type UseGetProcessData = [boolean, (process_id: string) => AxiosPromise<ProcessType>]

const useGetProcessData = (): UseGetProcessData => {
  const [{ loading }, getData] = useAxios<ProcessType>({ method: 'GET' }, { manual: true })

  const fetchData = (process_id: string) => getData({ url: `/schedule/${process_id}` })

  return [loading, fetchData]
}

export default useGetProcessData
