import useAxios from "axios-hooks"

type DocumentType = {
  _id?: string,
  data?: string,
  title: string,
  processNumber: string,
  variablesProcess: string,
}

type QueryPayload = {
  success: boolean,
  document: DocumentType,
}


const useSaveDocument = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/document', method: 'POST' }, { manual: true })

  const mutation = (data: DocumentType) => {
    if (data._id) return execute({ url: `/document/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }] as const
}

export default useSaveDocument
