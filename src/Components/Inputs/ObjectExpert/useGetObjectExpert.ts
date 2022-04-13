import useAxios from 'axios-hooks'

export type ObjectExpertType = {
  _id: string,
  description: string,
}

const useGetObjectExpert = () => (
  useAxios<ObjectExpertType[]>({ url: '/objectexpert', method: 'GET' }, { manual: false, useCache: false })
)

export default useGetObjectExpert
