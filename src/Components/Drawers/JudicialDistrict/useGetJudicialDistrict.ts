import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type QueryPayload = {
  success: boolean,
  judicialDistrict: {
    _id: string,
    description: string,
  }
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  boolean
]

type UseGetPersonKind = () => ReturnType

const useGetJudicialDistrict: UseGetPersonKind = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query = (id: string) => execute({ url: `/judicialdistrict/${id}` })

  return [query, loading]
}

export default useGetJudicialDistrict
