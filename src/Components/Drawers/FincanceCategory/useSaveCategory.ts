import useAxios from 'axios-hooks'
import { removeFalsyValues } from 'Utils/functions'

export type CategoryType = {
  _id?: string,
  description: string,
}

type QueryPayload = {
  success: boolean,
  message?: string,
  financialCategory: Omit<CategoryType, '_id'> & { _id: string }
}

const useSaveCategory = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/financialcategory', method: 'POST' }, { manual: true })

  const mutation = (raw_data: CategoryType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) {
      return execute({ url: `/financialcategory/${data._id}`, method: 'PUT', data })
    }

    return execute({ data })
  }

  return [mutation, loading] as const
}

export default useSaveCategory
