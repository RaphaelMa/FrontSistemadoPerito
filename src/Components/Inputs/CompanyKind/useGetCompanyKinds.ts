import useAxios from 'axios-hooks'

export type CompanyKindType = {
  _id: string,
  description: string,
}

const useGetCompanyKinds = () => (
  useAxios<CompanyKindType[]>({ url: '/kindcompany', method: 'GET' }, { manual: false })
)

export default useGetCompanyKinds
