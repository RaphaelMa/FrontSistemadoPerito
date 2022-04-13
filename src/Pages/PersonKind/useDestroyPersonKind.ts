import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { PersonKindType } from './types'

type QueryPayload = {
  success: boolean,
  message?: string,
  kindPeople: PersonKindType[]
}

const useDestroyPersonKind = (): [(id: string) => AxiosPromise<QueryPayload>, boolean] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'DELETE' }, { manual: true })

  const mutation = (id: string) => execute({ url: `/kindpeople/${id}` })

  return [mutation, loading]
}

export default useDestroyPersonKind
