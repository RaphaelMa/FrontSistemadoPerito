import useAxios, { Options } from 'axios-hooks'

export type FinancialAccountType = {
  _id: string,
  description: string,
}

const useGetFinancialAccount = (query_options?: Options) => (
  useAxios<FinancialAccountType[]>({ url: '/financialaccount', method: 'GET' }, {
    manual: false,
    useCache: false,
    ...query_options
  })
)

export default useGetFinancialAccount
