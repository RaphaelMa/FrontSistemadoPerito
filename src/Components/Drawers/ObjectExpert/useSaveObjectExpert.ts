import useAxios from 'axios-hooks'
import { removeFalsyValues } from 'Utils/functions'
import { ObjectExpertType } from './useGetObjectExpert'

type QueryPayload = {
  success: boolean,
  message?: string,
  objectExpert: Omit<ObjectExpertType, '_id'> & { _id: string }
}

const useSavePersonKind = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/objectexpert', method: 'POST' }, { manual: true })

  const mutation = (raw_data: ObjectExpertType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) {
      return execute({ url: `/objectexpert/${data._id}`, method: 'PUT', data })
    }

    return execute({ data })
  }

  return [mutation, loading] as const
}

export default useSavePersonKind
