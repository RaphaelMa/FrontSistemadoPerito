import useAxios from 'axios-hooks'

type QueryPayload = {
  message: {
    _id: string,
    description: string,
    key: string,
    tableAditional: {
      _id: string,
      interval: string,
      price: number
    }[],
  },
  success: true

}

const useGetTablePrices = () => {
  const [{ loading, data }, execute] = useAxios<QueryPayload>({ method: 'GET', url: '/tableprice/key=aditional_user' }, { manual: true })

  return [execute, { loading, data }] as const
}

export default useGetTablePrices
