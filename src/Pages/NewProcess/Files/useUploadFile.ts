import useAxios from 'axios-hooks'
import {  } from 'axios'

type QueryPayload = {
  file?: {
    _id: string,
    createAt: string,
    name: string,
    size: number,
    key: string,
    url: string,
    process_id: string
  },
  success: boolean,
  message?: string,
  key?: string,
}

const useSaveProcess = () => {
  const [, execute] = useAxios<QueryPayload>({ method: 'POST' }, { manual: true })

  return (process_id: string, data: FormData, onUploadProgress: (progress_event: any) => void) => (
    execute({
      url: `/uploadfiles/process=${process_id}`,
      data,
      onUploadProgress,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  )
}

export default useSaveProcess
