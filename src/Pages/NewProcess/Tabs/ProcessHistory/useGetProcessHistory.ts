import useAxios from 'axios-hooks'
import { HistoryType } from 'Pages/History/types'

const useGetProcessHistory = () => {
  const [{ loading }, getProcess] = useAxios<HistoryType[]>({ method: 'GET' }, { manual: true })

  const query = (id: string) => getProcess({ url: `/history/module=process/id=${id}` })

  return [{ loading }, query] as const
}

export default useGetProcessHistory
