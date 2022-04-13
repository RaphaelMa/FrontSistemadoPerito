import useAxios from 'axios-hooks'
import { PersonKindType } from './types'

const useGetPersonKind = () => (
  useAxios<PersonKindType[]>({
    url: '/kindpeople',
    method: 'GET',
  }, {
    manual: true,
  })
)

export default useGetPersonKind
