import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'
import { ProcessType } from '../Process/types'

type QueryPayload = {
  success: boolean,
  message?: string,
  process?: ProcessType,
  key?: string,
}


type ReturnType = [
  (data: ProcessType) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSaveProcessType = () => ReturnType

const useSaveProcess: useSaveProcessType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/process', method: 'POST' }, { manual: true })

  const mutation = (raw_data: ProcessType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/process/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSaveProcess
