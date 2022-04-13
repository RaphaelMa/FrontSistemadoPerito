import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type QueryPayload = {
  success: boolean,
  judicialDistrictLevel: {
    _id: string,
    description: string,
  }
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  boolean
]

const useGetData = (): ReturnType => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query = (id: string) => execute({ url: `/judicialdistrictlevel/${id}` })

  return [query, loading]
}

export default useGetData
