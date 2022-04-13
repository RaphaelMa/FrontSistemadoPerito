import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { ProcessType } from './types'

type QueryPayload = {
  success: boolean,
  process: ProcessType
}

const useDestroyProcess = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/process/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyProcess
