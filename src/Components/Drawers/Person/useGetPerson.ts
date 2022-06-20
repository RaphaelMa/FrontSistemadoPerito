import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type QueryPayload = {
  success: boolean,
  people: {
    _id: string,
    name: string,
    birthday?: string,
    businessEmail?: string,
    personalEmail?: string,
    businessContact?: string,
    personalContact?: string,
    cep?: number,
    state?: string,
    city?: string,
    address?: string,
    agency?: string,
    bankAccount?: string,
    documentType?: string,
    document?: number,
  }
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useGetPersonType = () => ReturnType

const useGetPerson: useGetPersonType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query =  (id: string) => execute({ url: `/people/${id}` })

  return [query, { loading }]
}

export default useGetPerson
