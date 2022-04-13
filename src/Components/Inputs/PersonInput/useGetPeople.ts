import useAxios, { Options } from 'axios-hooks'

type PersonType = {
  _id: string,
  name: string,
}

const useGetPeople = (query_options?: Options) => (
  useAxios<PersonType[]>({ url: '/listdata/filter=people', method: 'GET' }, { manual: true, ...query_options })
)

export default useGetPeople
