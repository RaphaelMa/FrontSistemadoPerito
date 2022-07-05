import useAxios from 'axios-hooks'

type QueryPayload = {
  _id: string | any,
}

const useGetCompany = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "GET" }, { manual: true })

  const mutation = () => execute({
    url: `/company`,
  })

  return [mutation, { loading: loading }] as const
}

export default useGetCompany
