import useAxios from 'axios-hooks'

type QueryPayload = {
  _id: string | any,
  success: boolean,
  message: string,
}

const useUpdatePushStatus = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "GET" }, { manual: true })

  const mutation = (process: string) => execute({
    url: `/caiunaconta?processNumber=${process}`,
  })

  return [mutation, { loading: loading }] as const
}

export default useUpdatePushStatus
