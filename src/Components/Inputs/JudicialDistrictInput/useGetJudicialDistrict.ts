import useAxios from 'axios-hooks'

type JudicialDistrictType = {
  _id: string,
  description: string,
}

const useGetJudicialDistrict = () => {
  return useAxios<JudicialDistrictType[]>({ url: '/judicialdistrict', method: "GET" }, { manual: false })
}

export default useGetJudicialDistrict
