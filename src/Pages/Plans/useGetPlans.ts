import useAxios from 'axios-hooks'
import { Plan } from './types'

type QueryPayload = {
  plans: Plan[],
  success: boolean,
  message?: string
}

const useGetPlans = () => useAxios<QueryPayload>({ url: '/plan', method: 'GET' })

export default useGetPlans
