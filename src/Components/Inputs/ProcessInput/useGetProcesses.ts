import useAxios from 'axios-hooks'

type ProcessType = {
  _id: string,
  processNumber: string,
}


const useGetUsers = () => {
  return useAxios<ProcessType[]>({ url: '/listdata/filter=process', method: "GET" }, { manual: false, useCache: false })
}

export default useGetUsers
