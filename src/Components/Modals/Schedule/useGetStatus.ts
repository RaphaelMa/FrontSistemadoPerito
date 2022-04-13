import useAxios from 'axios-hooks'
import { Status } from './types'

const useGetStatus = () => (
  useAxios<Status[]>({ url: '/schedulestatus', method: 'GET' }, { manual: true, useCache: true })
)

export default useGetStatus
