import useAxios from 'axios-hooks'
import { Account } from './types'

type QueryPayload = Account[]

const useGetAccounts = () => (
  useAxios<QueryPayload>({ url: '/financialaccount', method: "GET" }, { manual: false })
)

export default useGetAccounts
