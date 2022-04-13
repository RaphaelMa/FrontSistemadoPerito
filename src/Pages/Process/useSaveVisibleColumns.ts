import useAxios from 'axios-hooks'
import { VisibleColumnType } from './types'

type QueryPayload = {
  success: boolean,
  message: string,
}

const useUpdatePushStatus = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "PUT" }, { manual: true })

  const mutation = (data: VisibleColumnType) => execute({
    url: `/processcolumn/${data._id}`,
    data
  })

  return [mutation, { loading: loading }] as const
}

export default useUpdatePushStatus
