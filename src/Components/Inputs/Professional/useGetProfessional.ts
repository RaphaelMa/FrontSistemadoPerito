import useAxios from 'axios-hooks'

export type ProfessionalType = {
  _id: string,
  description: string,
}

const useGetProfessional = () => (
  useAxios<ProfessionalType[]>({ url: '/professional', method: 'GET' }, { manual: false })
)

export default useGetProfessional
