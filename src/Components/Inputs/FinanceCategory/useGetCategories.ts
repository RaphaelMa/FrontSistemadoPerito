import useAxios from 'axios-hooks'

type CategoryType = {
  _id: string,
  description: string,
}

const useGetCategories = () => (
  useAxios<CategoryType[]>({ url: '/financialcategory', method: 'GET', }, { manual: false, useCache: false })
)

export default useGetCategories
