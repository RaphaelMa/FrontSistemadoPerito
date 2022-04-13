import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { MultiCompaniesType } from 'Pages/MultiCompanies/types'

type QueryPayload = {
  success: boolean,
  multicompany: MultiCompaniesType
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useGetUnitType = () => ReturnType

const useGetUnit: useGetUnitType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query = (id: string) => execute({ url: `/multicompany/${id}` })

  return [query, { loading }]
}

export default useGetUnit
