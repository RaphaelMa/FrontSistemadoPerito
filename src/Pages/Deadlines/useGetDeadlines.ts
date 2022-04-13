import useAxios from 'axios-hooks'
import { IndicatorsType, DeadlineType } from './types'

type QueryPayload = {
  indicators: IndicatorsType,
  arrayOverDue: DeadlineType[],
  arrayFiveDays: DeadlineType[],
  arrayTenDays: DeadlineType[],
  arrayFifteenDays: DeadlineType[],
  arrayTwentyDays: DeadlineType[],
  arrayDone: DeadlineType[],
}

const useGetDeadlines = () => (
  useAxios<QueryPayload>({ url: '/deadline', method: 'GET' }, { manual: false, useCache: false })
)
export default useGetDeadlines
