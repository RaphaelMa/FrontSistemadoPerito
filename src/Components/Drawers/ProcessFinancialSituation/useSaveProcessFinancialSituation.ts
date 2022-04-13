import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  financialSituation: Omit<ProcessFinancialSituationType, '_id'> & { _id: string }
}

export type ProcessFinancialSituationType = {
  _id?: string,
  description: string,
}

type ReturnType = [
  (data: ProcessFinancialSituationType) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSaveProcessFinancialSituationType = () => ReturnType

const useSaveProcessFinancialSituation: useSaveProcessFinancialSituationType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({
      url: '/processfinancialsituation',
      method: 'POST',
    },
    { manual: true },
  )

  const mutation = (raw_data: ProcessFinancialSituationType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/processfinancialsituation/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSaveProcessFinancialSituation
