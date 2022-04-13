import useAxios from 'axios-hooks'
import { ObjectExpertType } from './types'

const useGetObjectExpert = () => (useAxios<ObjectExpertType[]>({ url: '/objectExpert', method: 'GET' }, { manual: true }))

export default useGetObjectExpert
