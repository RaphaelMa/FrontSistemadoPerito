import useAxios from 'axios-hooks'

type ColumnType = {
  _id: string,
  description: string,
  order: number,
}

const useGetColumns = () => {
  return useAxios<ColumnType[]>({ url: '/taskcolumn', method: "GET" }, { manual: true })
}

export default useGetColumns
