import useAxios from 'axios-hooks'
import { StatusImpeachment } from './types'

type QueryPayload = {
  statusImpeachment: StatusImpeachment,
  success: boolean
}

const useGetStatusImpugnation = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query =  (id: string) => execute({ url: `/statusimpeachment/${id}` })

  return [query, { loading }] as const
}

export default useGetStatusImpugnation
