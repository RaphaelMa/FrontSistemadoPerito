import useAxios from 'axios-hooks'
import { removeFalsyValues } from 'Utils/functions'
import { FinancialType, GeneralFinancial } from './types'

type QueryPayload = {
  success: boolean,
  message?: string,
  financial: { _id: string } & Omit<FinancialType, '_id'>,
  generalFinancial: GeneralFinancial
}

const useSaveFinancial = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/financial', method: 'POST' }, { manual: true })

  const mutation = (raw_data: FinancialType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) {
      return execute({ url: `/financial/${data._id}`, method: 'PUT', data })
    }

    return execute({ data })
  }

  return [mutation, loading] as const
}

export default useSaveFinancial
