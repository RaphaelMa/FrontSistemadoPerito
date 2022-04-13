import useAxios from 'axios-hooks'

type VariablesType = {
  description: string,
  key: string,
}

type QueryPayload = VariablesType[]

const useGetVariables = (type: 'people' | 'process') => {
  return useAxios<QueryPayload>({ url: `/documentvariables/type=${type}`, method: "GET" }, { manual: false })
}

export default useGetVariables
