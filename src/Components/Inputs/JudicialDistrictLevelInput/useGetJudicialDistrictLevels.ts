import useAxios from 'axios-hooks'

type JudicialDistrictLevelType = {
  _id: string,
  description: string,
}

const useGetJudicialDistrictLevels = () => {
  return useAxios<JudicialDistrictLevelType[]>({ method: "GET" }, { manual: true })
}

export default useGetJudicialDistrictLevels
