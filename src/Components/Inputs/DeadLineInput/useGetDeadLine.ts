import useAxios from 'axios-hooks'

export type DeadLineType = {
  _id: string,
  description: string,
  key: string,
}

type PayloadType = {
  message: DeadLineType[],
  success?: boolean,
}

const useGetDeadLine = () => (
  useAxios<PayloadType>({ url: '/deadlinetypes', method: 'GET' }, { manual: false, useCache: false })
)

export default useGetDeadLine
