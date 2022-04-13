import useAxios from 'axios-hooks'
import { ColumnType } from './Types'

type QueryPayload = {
  success: boolean,
  column: Omit<ColumnType, 'tasks'>
}

const useDeleteColumn = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/taskcolumn/${id}` })

  return [mutation, { loading: loading }] as const
}

export default useDeleteColumn
