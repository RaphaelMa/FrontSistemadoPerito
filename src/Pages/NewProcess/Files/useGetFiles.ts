import useAxios from 'axios-hooks'

type FileType = {
  _id: string,
  createAt: string,
  name: string,
  size: string,
  key: string,
  url: string,
  process_id: string
}

const useGetFiles = () => {
  const [, execute] = useAxios<FileType[]>({ method: "GET" }, { manual: true })

  return (process_id: string) => execute({ url: `/uploadfiles/process=${process_id}` })
}

export default useGetFiles
