import useAxios from 'axios-hooks'
import { Schedule } from './types'
import { AxiosPromise } from 'axios'

type Payload = {
  schedule: Schedule,
  success: boolean,
  message?: string,
}

type UseUpdateScheduleStatus = (process_id: string) => [boolean, (status_id: string) => AxiosPromise<Payload>]

const useUpdateScheduleStatus: UseUpdateScheduleStatus = (schedule_id: string) => {
  const [{ loading }, execute] = useAxios<Payload>({ url: `/schedule/${schedule_id}`, method: 'PUT' }, { manual: true })

  const mutation = (status_id: string) => execute({ data: { scheduleStatus_id: status_id } })

  return [loading, mutation]
}

export default useUpdateScheduleStatus
