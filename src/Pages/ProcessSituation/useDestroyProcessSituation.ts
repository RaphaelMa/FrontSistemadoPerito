import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { ProcessSituationType } from './types'

type QueryPayload = {
  success: boolean,
  situation: ProcessSituationType
}

const useDestroyProcessSituation = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/processsituation/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyProcessSituation
