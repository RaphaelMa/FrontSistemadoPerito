import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { DocumentType } from './Types'

type QueryPayload = {
  success: boolean,
  document: DocumentType
}

const useDestroyDocument = (): [(id: string) => AxiosPromise<QueryPayload>, { loading: boolean }] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: "DELETE" }, { manual: true })

  const mutation = (id: string) => execute({ url: `/document/${id}` })

  return [mutation, { loading: loading }]
}

export default useDestroyDocument
