import useAxios from 'axios-hooks'

export type ObjectExpertType = {
  _id: string,
  description: string,
}

type QueryPayload = {
  objectExpert: ObjectExpertType,
  success: boolean
}

const useGetObjectExpert = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/objectexpert', method: 'GET' }, { manual: false })

  const query = (id: string) => execute({ url: `/objectexpert/${id}` })

  return [query, loading] as const
}

export default useGetObjectExpert
