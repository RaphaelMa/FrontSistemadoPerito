import useAxios from 'axios-hooks'

type UsersType = {
  _id: string,
  active: boolean,
  name: string,
  email: string,
  cellPhone: string,
  areaId: string,
  areaDescription: string,
}


const useGetUsers = () => {
  return useAxios<UsersType[]>({ url: '/listdata/filter=user', method: "GET" }, { manual: true })
}

export default useGetUsers
