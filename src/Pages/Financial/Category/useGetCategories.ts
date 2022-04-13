import useAxios from 'axios-hooks'
import { CategoryType } from './types'

const useGetPeople = () => {
  return useAxios<CategoryType[]>({ url: '/financialcategory', method: "GET" }, { manual: false })
}

export default useGetPeople
