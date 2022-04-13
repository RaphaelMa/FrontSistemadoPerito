import useAxios, { Options } from 'axios-hooks'

type PersonKindType = {
  _id: string,
  description: string,
  processQuantity: number,
}

const useGetPersonKind = (options?: Options) => (
  useAxios<PersonKindType[]>({ url: '/kindpeople', method: 'GET' }, { manual: false, ...options })
)

export default useGetPersonKind
