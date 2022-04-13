import useAxios from 'axios-hooks'

type PrevisionDateType = {
  success: false,
  previsionReport?: string,
  previsionImpugnment?: string,
  message?: string,
  key?: string,
}

const useGetProcessSituation = () => {
  return useAxios<PrevisionDateType>({ url: '/processdays', method: "POST" }, { manual: true })
}

export default useGetProcessSituation
