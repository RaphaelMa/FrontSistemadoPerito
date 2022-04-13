import useAxios from 'axios-hooks'

type QueryPayload = {
  financialCategory: {
    _id: string,
    description: string,
  },
  success: boolean
}

const useGetCategory = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query = (id: string) => execute({ url: `/financialcategory/${id}` })

  return [query, loading] as const
}

export default useGetCategory
