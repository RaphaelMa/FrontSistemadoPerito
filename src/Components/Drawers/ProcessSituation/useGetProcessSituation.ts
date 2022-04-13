import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type QueryPayload = {
  success: boolean,
  situation: {
    _id: string,
    description: string,
  }
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useGetProcessSituationType = () => ReturnType

const useGetProcessSituation: useGetProcessSituationType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query =  (id: string) => execute({ url: `/processsituation/${id}` })

  return [query, { loading }]
}

export default useGetProcessSituation
