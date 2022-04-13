import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  keyWord: Omit<KeywordType, '_id'> & { _id: string }
}

export type KeywordType = {
  _id?: string,
  description: string,
}

type ReturnType = [
  (data: KeywordType) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSaveKeywordType = () => ReturnType

const useSaveKeyword: useSaveKeywordType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/keyword', method: 'POST' }, { manual: true })

  const mutation =  (raw_data: KeywordType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/keyword/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSaveKeyword
