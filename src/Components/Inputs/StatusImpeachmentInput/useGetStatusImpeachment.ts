import useAxios, { Options } from 'axios-hooks'
import { AxiosRequestConfig } from 'axios'

type StatusImpeachmentType = {
  _id: string,
  description: string,
  message?: string,
}

const axios_config: AxiosRequestConfig = { url: '/statusimpeachment', method: 'GET' }

const useGetStatusImpeachment = (options?: Options) => (
  useAxios<StatusImpeachmentType[]>(axios_config, { manual: false, useCache: false, ...options })
)

export default useGetStatusImpeachment
