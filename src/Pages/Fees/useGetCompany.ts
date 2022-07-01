import useAxios from 'axios-hooks'

type QueryPayload = {
  _id: string
}

const useGetCompany = () => {
  return useAxios<QueryPayload[]>({ url: '/company', method: "GET" }, { manual: false })
}

export default useGetCompany
