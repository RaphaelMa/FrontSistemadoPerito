import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type QueryPayload = {
  success: boolean,
  kindPeople: {
    _id: string,
    description: string,
  }
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  boolean
]

type UseGetPersonKind = () => ReturnType

const useGetPersonKind: UseGetPersonKind = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query = (id: string) => execute({ url: `/kindpeople/${id}` })

  return [query, loading]
}

export default useGetPersonKind
