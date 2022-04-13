import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { KeywordType } from './types'

type QueryPayload = {
  success: boolean,
  keyWord: KeywordType
}

const useDestroyKeyword = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/keyword/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyKeyword
