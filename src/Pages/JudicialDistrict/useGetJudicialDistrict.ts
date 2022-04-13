import useAxios from 'axios-hooks'
import { JudicialDistrictType } from './types'

const useGetPersonKind = () => (useAxios<JudicialDistrictType[]>({ url: '/judicialdistrict', method: 'GET' }, { manual: true }))

export default useGetPersonKind
