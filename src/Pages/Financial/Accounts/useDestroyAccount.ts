import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { Account } from './types'

type QueryPayload = {
  success: boolean,
  nature: Account
}

const useDestroyAccount = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/financialaccount/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyAccount
