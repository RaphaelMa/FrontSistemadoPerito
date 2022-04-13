import useAxios, { Options } from 'axios-hooks'

type ProcessSituationType = {
  _id: string,
  description: string,
}

const useGetProcessSituations = (query_options?: Options) => (
  useAxios<ProcessSituationType[]>({ url: '/processsituation', method: 'GET' }, { manual: false, ...query_options })
)

export default useGetProcessSituations
