import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { Month } from './types'
import { Moment } from 'moment'

type QueryPayload = {
  month: Month[]
}

type GetDataPayload = [boolean, (date: Moment) => AxiosPromise<QueryPayload>]

const useGetScheduleData = (): GetDataPayload => {
  const [{ loading }, getData] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const fetchData = (date: Moment) => getData({ url: `/schedule/date=${date.format('YYYY-MM-DD')}` })

  return [loading, fetchData]
}

export default useGetScheduleData
