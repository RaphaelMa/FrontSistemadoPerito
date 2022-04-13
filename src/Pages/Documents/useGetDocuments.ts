import useAxios from 'axios-hooks'
import { DocumentType } from './Types'

const useGetDocuments = () => {
  return useAxios<DocumentType[]>({ url: '/document', method: "GET" }, { manual: false })
}

export default useGetDocuments
