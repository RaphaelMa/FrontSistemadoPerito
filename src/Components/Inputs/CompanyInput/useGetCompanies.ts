import useAxios, { Options } from 'axios-hooks'

type MultiCompaniesType = {
  _id: string,
  description: string,
}


const useGetCompanies = (query_options?: Options) => (
  useAxios<MultiCompaniesType[]>({ url: '/multicompany', method: 'GET' }, { useCache: false, ...query_options })
)

export default useGetCompanies
