import useAxios from 'axios-hooks'
import { UserType } from './types'

const useGetPeople = () => {
  return useAxios<UserType[]>({ url: '/user', method: "GET" }, { manual: false })
}

export default useGetPeople
