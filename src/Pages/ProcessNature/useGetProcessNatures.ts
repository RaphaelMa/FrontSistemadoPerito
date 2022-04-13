import useAxios from 'axios-hooks'
import { ProcessNatureType } from './types'

const useGetProcessNatures = () => {
  return useAxios<ProcessNatureType[]>({ url: '/processnature', method: "GET" }, { manual: true })
}

export default useGetProcessNatures
