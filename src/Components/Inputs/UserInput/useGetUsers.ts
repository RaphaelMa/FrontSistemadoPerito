import useAxios from 'axios-hooks'

export type UsersType = {
  _id: string,
  name: string,
}

const useGetUsers = () => (
  useAxios<UsersType[]>({ url: '/listdata/filter=user', method: 'GET' }, { manual: false, useCache: false })
)

export default useGetUsers
