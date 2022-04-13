import useAxios from 'axios-hooks'
import { ProcessFinancialSituationType } from './types'

const useGetProcessFinancialSituations = () => {
  return useAxios<ProcessFinancialSituationType[]>({ url: '/processfinancialsituation', method: "GET" }, { manual: true })
}

export default useGetProcessFinancialSituations
