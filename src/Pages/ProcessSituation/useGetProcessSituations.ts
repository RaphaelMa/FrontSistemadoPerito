import useAxios from 'axios-hooks'
import { ProcessSituationType } from './types'

const useGetProcessSituation = () => {
  return useAxios<ProcessSituationType[]>({ url: '/processsituation', method: "GET" }, { manual: true })
}

export default useGetProcessSituation
