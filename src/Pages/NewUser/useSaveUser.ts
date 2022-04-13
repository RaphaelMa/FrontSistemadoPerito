import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'

type QueryPayload = {
  success: boolean,
  message?: string,
  user: Omit<UserType, '_id'> & { _id: string }
}

export type UserType = {
  _id?: string,
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
  cpf: string,
  birthday: string,
  cellPhone?: string,
  active: boolean,
  name: string,
  areaId?: string,
  areaDescription?: string, //Área de Atuação
  area_key?: string,
}

type ReturnType = [
  (data: UserType) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSaveUserType = () => ReturnType

const useSaveUser: useSaveUserType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/user', method: 'POST' }, { manual: true })

  const mutation =  (raw_data: UserType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/user/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSaveUser
