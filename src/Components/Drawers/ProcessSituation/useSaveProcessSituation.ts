import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  situation: Omit<ProcessSituation, '_id'> & { _id: string }
}

export type ProcessSituation = {
  _id?: string,
  description: string,
}

type ReturnType = [
  (data: ProcessSituation) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSaveProcessSituationType = () => ReturnType

const useSaveProcessSituation: useSaveProcessSituationType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/processsituation', method: 'POST' }, { manual: true })

  const mutation =  (raw_data: ProcessSituation) => {
    const data = removeFalsyValues(raw_data)
    console.log('[useSaveProcessSituation] ', data, raw_data)

    if (data._id) return execute({ url: `/processsituation/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSaveProcessSituation
