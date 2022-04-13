import useAxios from 'axios-hooks'
import { removeFalsyValues } from 'Utils/functions'
import { AxiosPromise } from 'axios'
import { JudicialDistrictLevelType } from './types'

type ReturnType = [
  (data: JudicialDistrictLevelType) => AxiosPromise<QueryPayload>,
  boolean
]

type UseSavePersonKind = () => ReturnType

type QueryPayload = {
  success: boolean,
  message?: string,
  judicialDistrictLevel: { _id: string } & Omit<JudicialDistrictLevelType, '_id'>
}

const useSaveJudicialDistrictLevel: UseSavePersonKind = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({
    url: '/judicialdistrictlevel',
    method: 'POST',
  }, { manual: true })

  const mutation = (raw_data: JudicialDistrictLevelType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) {
      return execute({
        url: `/judicialdistrictlevel/${data._id}`,
        method: 'PUT',
        data: {
          description: data.description,
        },
      })
    }

    return execute({ data })
  }

  return [mutation, loading]
}

export default useSaveJudicialDistrictLevel
