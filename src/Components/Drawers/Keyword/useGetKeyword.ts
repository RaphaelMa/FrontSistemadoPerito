import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type QueryPayload = {
  success: boolean,
  keyWord: {
    _id: string,
    description: string,
  }
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useGetKeywordType = () => ReturnType

const useGetKeyword: useGetKeywordType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query =  (id: string) => execute({ url: `/keyword/${id}` })

  return [query, { loading }]
}

export default useGetKeyword
