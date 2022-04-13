import useAxios from 'axios-hooks'
import { FinancialType } from './types'

type QueryPayload = {
  success: boolean,
  financial: FinancialType,
}

const useGetFinancial = () => {
  const [{ loading, data }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query = (id: string) => execute({ url: `/financial/${id}` })

  return [{ loading, data }, query] as const
}

export default useGetFinancial
