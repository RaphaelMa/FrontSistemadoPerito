import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { ObjectExpertType } from './types'

type QueryPayload = {
  success: boolean,
  message?: string,
  objectExpert: ObjectExpertType[]
}

const useDestroyObjectExpert = (): [(id: string) => AxiosPromise<QueryPayload>, boolean] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'DELETE' }, { manual: true })

  const mutation = (id: string) => execute({ url: `/objectexpert/${id}` })

  return [mutation, loading]
}

export default useDestroyObjectExpert
