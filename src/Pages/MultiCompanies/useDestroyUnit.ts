import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { MultiCompaniesType } from './types'

type QueryPayload = {
  success: boolean,
  multicompany: MultiCompaniesType
}

const useDestroyUnit = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/multicompany/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyUnit
