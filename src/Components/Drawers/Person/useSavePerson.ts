import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  people: Omit<PersonType, '_id'> & { _id: string }
}

export type PersonType = {
  _id?: string,
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

type ReturnType = [
  (data: PersonType) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSavePersonType = () => ReturnType

const useSavePerson: useSavePersonType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/people', method: 'POST' }, { manual: true })

  const mutation =  (raw_data: PersonType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/people/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSavePerson
