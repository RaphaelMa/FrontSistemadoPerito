import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { JudicialDistrictType } from './types'

type QueryPayload = {
  success: boolean,
  message?: string,
  judicialDistrict: JudicialDistrictType[]
}

const useDestroyJudicialDistrict = (): [(id: string) => AxiosPromise<QueryPayload>, boolean] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'DELETE' }, { manual: true })

  const mutation = (id: string) => execute({ url: `/judicialdistrict/${id}` })

  return [mutation, loading]
}

export default useDestroyJudicialDistrict
