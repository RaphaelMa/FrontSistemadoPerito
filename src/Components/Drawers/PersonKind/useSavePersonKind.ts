import useAxios from 'axios-hooks'
import { removeFalsyValues } from 'Utils/functions'
import { AxiosPromise } from 'axios'

export type PersonKindType = {
  _id?: string,
  description: string,
}

type ReturnType = [
  (data: PersonKindType) => AxiosPromise<QueryPayload>,
  boolean
]

type UseSavePersonKind = () => ReturnType

type QueryPayload = {
  success: boolean,
  message?: string,
  kindPeople: Omit<PersonKindType, '_id'> & { _id: string }
}

const useSavePersonKind: UseSavePersonKind = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/kindpeople', method: 'POST' }, { manual: true })

  const mutation = (raw_data: PersonKindType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) {
      return execute({ url: `/kindpeople/${data._id}`, method: 'PUT', data })
    }

    return execute({ data })
  }

  return [mutation, loading]
}

export default useSavePersonKind
