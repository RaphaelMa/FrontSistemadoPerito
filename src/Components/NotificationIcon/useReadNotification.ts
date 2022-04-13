import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { NotificationType } from './useGetNotifications'

type QueryPayload = {
  success: boolean,
  notification: NotificationType,
}

const useReadNotification = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "PUT" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/notification/${id}` })

  return [mutation, { loading: loading }]
}

export default useReadNotification
