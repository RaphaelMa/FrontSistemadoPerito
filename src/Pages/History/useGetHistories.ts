import useAxios from 'axios-hooks'
import { HistoryType } from './types'

const useGetHistories = () => {
  return useAxios<HistoryType[]>({ url: '/history', method: "GET" }, { manual: true })
}

export default useGetHistories
