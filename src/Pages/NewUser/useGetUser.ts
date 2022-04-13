import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'

type QueryPayload = {
  kindUser?: {
    kindUser_id: string,
    kindUser_description: string, //Tipo de Usuário
    kindUser_key: string,
  },
  professional?: {
    professional_id: string,
    professional_description: string, //Atuando Como
    professional_key: string,
  },
  email: string,
  cellPhone?: string,
  active: boolean,
  _id: string,
  name: string,
  areaId?: string,
  areaDescription?: string, //Área de Atuação
  area_key?: string,
}

type ReturnType = [
  (id: string) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useGetUserType = () => ReturnType

const useGetUser: useGetUserType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'GET' }, { manual: true })

  const query =  (id: string) => execute({ url: `/user/${id}` })

  return [query, { loading }]
}

export default useGetUser
