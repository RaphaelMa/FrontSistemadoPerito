import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'
import { MultiCompaniesType } from 'Pages/MultiCompanies/types'

type QueryPayload = {
  success: boolean,
  message?: string,
  multicompany: Omit<MultiCompaniesType, '_id'> & { _id: string }
}

type ReturnType = [
  (data: MultiCompaniesType) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSaveUnitType = () => ReturnType

const useSaveUnit: useSaveUnitType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/multicompany', method: 'POST' }, { manual: true })

  const mutation = (raw_data: MultiCompaniesType) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ url: `/multicompany/${data._id}`, method: 'PUT', data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSaveUnit
