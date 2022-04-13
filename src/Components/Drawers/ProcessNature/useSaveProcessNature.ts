import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  nature: Omit<ProcessNatureType, '_id'> & { _id: string }
}

export type ProcessNatureType = {
  _id?: string,
  description: string,
}

type ReturnType = [
  (data: ProcessNatureType) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSaveProcessNatureType = () => ReturnType

const useSaveProcessNature: useSaveProcessNatureType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/processnature', method: 'POST' }, { manual: true })

  const mutation =  (raw_data: ProcessNatureType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/processnature/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSaveProcessNature
