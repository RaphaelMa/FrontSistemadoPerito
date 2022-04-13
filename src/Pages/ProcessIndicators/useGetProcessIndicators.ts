import useAxios from 'axios-hooks'

type QueryPayload<T> = {
  message: T[]
}

const useGetProcesses = <T extends object>() => {
  const [{ loading, data }, getProcess] = useAxios<QueryPayload<T>>({ method: "GET" }, { manual: true })

  const query = (type: 'situation' | 'financial-situation') => getProcess({ url: `indicatorsprocess/type=${type}` })

  return [{ loading, data }, query] as const
}

export default useGetProcesses
