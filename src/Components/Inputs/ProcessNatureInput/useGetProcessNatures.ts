import useAxios, { Options } from 'axios-hooks'

export type ProcessNatureType = {
  _id: string,
  description: string,
}


const useGetProcessNatures = (query_options?: Options) => (
  useAxios<ProcessNatureType[]>({ url: '/processnature', method: 'GET' }, {
    manual: false,
    useCache: false,
    ...query_options
  })
)

export default useGetProcessNatures
