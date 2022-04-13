import useAxios from 'axios-hooks'
import { KeywordType } from './types'

const useGetKeywords = () => {
  return useAxios<KeywordType[]>({ url: '/keyword', method: "GET" }, { manual: true })
}

export default useGetKeywords
