import useAxios from 'axios-hooks'
import { JudicialDistrictLevelType } from 'Pages/JudicialDistrictLevel/types'

const useGetJudicialDistrictLevel = (id: string) => (
  useAxios<JudicialDistrictLevelType[]>({
    url: `/judicialdistrictlevel/judicialdistrict=${id}`,
    method: 'GET',
  }, {
    manual: true,
  })
)

export default useGetJudicialDistrictLevel
