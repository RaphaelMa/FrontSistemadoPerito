import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { UserType } from './types'

type QueryPayload = {
  success: boolean,
  process: UserType,
}

const useDestroyUser = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/user/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyUser
