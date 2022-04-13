import useAxios from 'axios-hooks'
import { StatusImpeachment } from './types'
import { removeFalsyValues } from 'Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  statusImpeachment: Omit<StatusImpeachment, '_id'> & { _id: string }
}

const useSaveStatus = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/statusimpeachment', method: 'POST' }, { manual: true })

  const mutation =  (raw_data: StatusImpeachment) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/statusimpeachment/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }] as const
}

export default useSaveStatus
