import useAxios from 'axios-hooks'
import { FinanceAccount } from './types'

type QueryPayload = {
  financialAccount: FinanceAccount,
  success: boolean
}

const useGetFinanceAccount = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query = (id: string) => execute({ url: `/financialaccount/${id}` })

  return [query, { loading }] as const
}

export default useGetFinanceAccount
