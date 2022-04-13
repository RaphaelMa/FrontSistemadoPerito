import useAxios from 'axios-hooks'

type QueryPayload = {
  success: boolean,
  message: string,
}

const useUpdatePushStatus = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "PUT" }, { manual: true })

  const mutation = (id: string, value: boolean) => execute({
    url: `/push/${id}`,
    data: { statusProcessMonitoring: value }
  })

  return [mutation, { loading: loading }] as const
}

export default useUpdatePushStatus
