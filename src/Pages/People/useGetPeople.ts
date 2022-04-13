import useAxios from 'axios-hooks'
import { PersonType } from './types'

type QueryPayload = {
  success: boolean,
  people: PersonType[]
}

const useGetPeople = () => {
  return useAxios<QueryPayload>({ url: '/people', method: "GET" }, { manual: false })
}

export default useGetPeople
