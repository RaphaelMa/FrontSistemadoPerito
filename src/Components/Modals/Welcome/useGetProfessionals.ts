import useAxios from 'axios-hooks'
import { Professional } from './types'

const useGetProfessionals = () => (
  useAxios<Professional[]>({ url: '/professional', method: 'GET' }, { manual: true, useCache: true })
)

export default useGetProfessionals
