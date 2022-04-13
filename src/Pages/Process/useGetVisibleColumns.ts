import useAxios from 'axios-hooks'
import { VisibleColumnType } from './types'

const useGetVisibleColumns = () => {
  return useAxios<VisibleColumnType>({ url: '/processcolumn', method: "GET" }, { manual: true })
}

export default useGetVisibleColumns
