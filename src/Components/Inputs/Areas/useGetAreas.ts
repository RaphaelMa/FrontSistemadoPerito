import useAxios from 'axios-hooks'

export type AreasType = {
  _id: string,
  description: string,
}

const useGetAreas = () => (
  useAxios<AreasType[]>({ url: '/areas', method: 'GET' }, { manual: false })
)

export default useGetAreas
