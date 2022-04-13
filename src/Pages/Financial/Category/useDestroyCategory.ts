import useAxios from 'axios-hooks'
import { CategoryType } from './types'

type QueryPayload = {
  success: boolean,
  financecategory: CategoryType
}

const useDestroyCategory = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/financialcategory/${id}` })

  return [mutation, { loading: loading }] as const
}

export default useDestroyCategory
