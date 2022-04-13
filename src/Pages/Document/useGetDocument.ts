import useAxios from 'axios-hooks'
import { useCallback } from 'react'

type QueryPayload = {
  document: {
    _id: string,
    title: string,
    data: string,
  }
  success: boolean,
}

const useGetDocument = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "GET" }, { manual: true })

  const query =  useCallback((id: string) => execute({ url: `/document/${id}` }), [execute])

  return [query, { loading }] as const
}

export default useGetDocument
