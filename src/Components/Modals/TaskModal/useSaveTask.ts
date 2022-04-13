import useAxios from 'axios-hooks'
import { TaskType } from './Types'
import { removeFalsyValues } from '../../../Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  task: TaskType
}

const useSaveTask = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/taskcard', method: 'POST' }, { manual: true })

  const mutation = (raw_data: Omit<TaskType, '_id'> & { _id?: string }) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) {
      return execute({ url: `/taskcard/${data._id}`, method: 'PUT', data })
    }

    return execute({ data })
  }

  return [mutation, { loading }] as const
}

export default useSaveTask
