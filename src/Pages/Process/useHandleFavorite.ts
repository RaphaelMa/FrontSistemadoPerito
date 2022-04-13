import useAxios from 'axios-hooks'

type QueryPayload = {
  success: boolean,
  message: string,
}

const useHandleFavorite = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "PUT" }, { manual: true })

  const mutation = (id: string, value: boolean) => execute({
    url: `/favorite/${id}`,
    data: { favorite: value }
  })

  return [mutation, { loading: loading }] as const
}

export default useHandleFavorite
