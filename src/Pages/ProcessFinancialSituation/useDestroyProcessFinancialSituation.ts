import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { ProcessFinancialSituationType } from './types'

type QueryPayload = {
  success: boolean,
  financialSituation: ProcessFinancialSituationType
}

const useDestroyProcessFinancialSituation = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/processfinancialsituation/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyProcessFinancialSituation
