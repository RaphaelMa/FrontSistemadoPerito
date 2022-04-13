import useAxios from 'axios-hooks'
import { FinancialCategory } from './types'

const useGetFinancialCategory = () => useAxios<FinancialCategory[]>({ method: 'GET' }, { manual: true })

export default useGetFinancialCategory
