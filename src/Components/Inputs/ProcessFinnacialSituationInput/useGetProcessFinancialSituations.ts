import useAxios, { Options } from 'axios-hooks'

type ProcessFinancialSituationType = {
  _id: string,
  description: string,
}

const useGetProcessFinacialSituations = (query_options?: Options) => (
  useAxios<ProcessFinancialSituationType[]>({
    url: '/processfinancialsituation',
    method: 'GET'
  }, { manual: false, ...query_options })
)

export default useGetProcessFinacialSituations
