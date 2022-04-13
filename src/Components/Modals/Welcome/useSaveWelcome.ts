import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type Payload = {
  success: boolean,
  message?: string,
}

type UseUpdateScheduleStatus = () => [boolean, (professional_id: string) => AxiosPromise<Payload>]

const useSaveWelcome: UseUpdateScheduleStatus = () => {
  const [{ loading }, execute] = useAxios<Payload>({ url: '/welcome', method: 'PUT' }, { manual: true })

  const mutation = (professional_id: string) => execute({ data: { welcome: false, professional_id } })

  return [loading, mutation]
}

export default useSaveWelcome

