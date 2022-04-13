import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { StatusImpeachment } from './types'

type QueryPayload = {
  success: boolean,
  nature: StatusImpeachment
}

const useDestroyStatusImpeachment = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/statusimpeachment/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyStatusImpeachment
