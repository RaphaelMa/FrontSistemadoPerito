import useAxios from 'axios-hooks'

export type KindUserType = {
  _id: string,
  description: string,
  key: string,
}

const useGetUserKinds = () => (
  useAxios<KindUserType[]>({ url: '/kinduser', method: 'GET' }, { manual: false })
)

export default useGetUserKinds
