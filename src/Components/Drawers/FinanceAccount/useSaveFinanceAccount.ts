import useAxios from 'axios-hooks'
import { FinanceAccount } from './types'
import { removeFalsyValues } from 'Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  financialAccount: Omit<FinanceAccount, '_id'> & { _id: string }
}

const useSaveFinanceAccount = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/financialaccount', method: 'POST' }, { manual: true })

  const mutation =  (raw_data: FinanceAccount) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/financialaccount/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }] as const
}

export default useSaveFinanceAccount
