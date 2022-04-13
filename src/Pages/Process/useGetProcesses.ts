import useAxios from 'axios-hooks'
import { ProcessType } from './types'

const useGetProcesses = () => useAxios<ProcessType[]>({ url: '/process', method: "GET" }, { manual: true })

export default useGetProcesses
