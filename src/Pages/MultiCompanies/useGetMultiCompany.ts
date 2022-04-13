import useAxios from 'axios-hooks'
import { MultiCompaniesType } from './types'

const useGetMultiCompany = () => (
  useAxios<MultiCompaniesType[]>({ url: '/multicompany', method: 'GET' }, { manual: false })
)

export default useGetMultiCompany
