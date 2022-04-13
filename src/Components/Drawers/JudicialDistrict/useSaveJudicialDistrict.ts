import useAxios from 'axios-hooks'
import { removeFalsyValues } from 'Utils/functions'
import { AxiosPromise } from 'axios'
import { JudicialDistrictType } from './types'

type ReturnType = [
  (data: JudicialDistrictType) => AxiosPromise<QueryPayload>,
  boolean
]

type UseSavePersonKind = () => ReturnType

type QueryPayload = {
  success: boolean,
  message?: string,
  judicialDistrict: { _id: string } & Omit<JudicialDistrictType, '_id'>
}

const useSaveJudicialDistrict: UseSavePersonKind = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/judicialdistrict', method: 'POST' }, { manual: true })

  const mutation = (raw_data: JudicialDistrictType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) {
      return execute({ url: `/judicialdistrict/${data._id}`, method: 'PUT', data })
    }

    return execute({ data })
  }

  return [mutation, loading]
}

export default useSaveJudicialDistrict
