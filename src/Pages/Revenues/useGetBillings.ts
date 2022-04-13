import useAxios from 'axios-hooks'
import { RevenuesType } from './types'

const useGetBillings = () => useAxios<RevenuesType>({ url: '/billing', method: 'GET' }, { manual: true })

export default useGetBillings
