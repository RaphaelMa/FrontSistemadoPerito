import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type QueryPayload = {
  success: boolean,
  financialSituation: {
    _id: string,
    description: string,
  }
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useGetProcessFinancialSituationType = () => ReturnType

const useGetProcessFinancialSituation: useGetProcessFinancialSituationType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query =  (id: string) => execute({ url: `/processfinancialsituation/${id}` })

  return [query, { loading }]
}

export default useGetProcessFinancialSituation
