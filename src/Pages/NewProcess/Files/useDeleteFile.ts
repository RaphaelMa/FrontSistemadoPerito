import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type FileType = {
  success: boolean,
  message?: string,
  key?: string,
  file?: {
    _id: string,
    createAt: string,
    name: string,
    size: string,
    key: string,
    url: string,
    process_id: string
  }
}

type UseDeleteFileType = () => [
  (id: string) => AxiosPromise<FileType>,
  { loading: boolean }
]

const useDeleteFile: UseDeleteFileType = () => {
  const [{ loading }, execute] = useAxios<FileType>({ method: "DELETE" }, { manual: true })

  const deleteFile = (id: string) => execute({ url: `/uploadfiles/arquivo=${id}` })

  return [deleteFile, { loading }]
}

export default useDeleteFile
