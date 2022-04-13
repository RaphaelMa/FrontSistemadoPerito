import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { PersonType } from './types'

type QueryPayload = {
  success: boolean,
  people: PersonType
}

const useDestroyPeople = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/people/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyPeople
