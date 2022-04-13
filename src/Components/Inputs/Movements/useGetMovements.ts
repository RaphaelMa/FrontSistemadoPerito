import useAxios from 'axios-hooks'

type MovementType = {
  _id: string,
  description: string,
}

const useGetMovements = () => (
  useAxios<MovementType[]>({ url: '/movement', method: 'GET', }, { manual: false })
)

export default useGetMovements
