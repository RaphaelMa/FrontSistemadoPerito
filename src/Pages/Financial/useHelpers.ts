import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { FinancialType } from './types'

export type QueryPayload = {
  success: boolean,
  message?: string,
  financial: { _id: string } & Omit<FinancialType, '_id'>
  generalFinancial: {
    pay: number,
    receive: number,
    total: number,
    totalRecepetValue?: number | ''
  }
}

type ReturnType = [(data: FinancialType) => AxiosPromise<QueryPayload>, boolean]

export const useSaveFinancial = (): ReturnType => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/financial', method: 'POST' }, { manual: true })

  const mutation = (data: FinancialType) => {
    // const data = removeFalsyValues(raw_data)

    if (data._id) {
      return execute({ url: `/financial/${data._id}`, method: 'PUT', data })
    }

    return execute({ data })
  }

  return [mutation, loading]
}

export const useDestroyFinancial = (): [(id: string) => AxiosPromise<QueryPayload>, boolean] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'DELETE' }, { manual: true })

  const mutation = (id: string) => execute({ url: `/financial/${id}` })

  return [mutation, loading]
}
