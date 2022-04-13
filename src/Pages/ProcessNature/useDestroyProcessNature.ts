import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { ProcessNatureType } from './types'

type QueryPayload = {
  success: boolean,
  nature: ProcessNatureType
}

const useDestroyProcessNature = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/processnature/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyProcessNature
