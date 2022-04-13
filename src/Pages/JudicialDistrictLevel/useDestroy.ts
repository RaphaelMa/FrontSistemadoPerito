import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { JudicialDistrictLevelType } from 'Pages/JudicialDistrictLevel/types'

type QueryPayload = {
  success: boolean,
  message?: string,
  JudicialDistrictLevel: JudicialDistrictLevelType[]
}

const useDestroy = (): [(id: string) => AxiosPromise<QueryPayload>, boolean] => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ method: 'DELETE' }, { manual: true })

  const mutation = (id: string) => execute({ url: `/judicialdistrictlevel/${id}` })

  return [mutation, loading]
}

export default useDestroy
