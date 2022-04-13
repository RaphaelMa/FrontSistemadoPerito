import useAxios from 'axios-hooks'
import { PaymentType } from './types'

export const useGetPaymentType = () => (
  useAxios<PaymentType[]>({ url: '/typePayment', method: 'GET' }, { manual: true })
)

type MutationPayload = {
  success: boolean,
  message?: string,
}

export const useSaveHire = () => useAxios<MutationPayload>({ url: '/hire', method: 'POST' }, { manual: true })
