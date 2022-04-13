import useAxios from 'axios-hooks'

type ColumnType = {
  _id: string,
  description: string,
  order: number,
}

type QueryPayload = {
  success: boolean,
  column: ColumnType,
}

const useSaveColumn = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/taskcolumn', method: 'POST' }, { manual: true })

  const mutation =  (data: { _id?: string, description: string }) => {
    if (data._id) return execute({ url: `/taskcolumn/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }] as const
}

export default useSaveColumn
