import useAxios from 'axios-hooks'
import { StatusImpeachment } from './types'

type QueryPayload = StatusImpeachment[]

const useGetStatusImpeachments = () => {
  return useAxios<QueryPayload>({ url: '/statusimpeachment', method: "GET" }, { manual: false })
}

export default useGetStatusImpeachments
