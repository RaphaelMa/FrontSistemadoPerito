import useAxios from 'axios-hooks'
import { AxiosPromise } from 'axios'
import { removeFalsyValues } from 'Utils/functions'
import { CompanyType } from 'Redux/Types'

type QueryPayload = {
  success: boolean,
  message?: string,
  company: CompanyType
}

export type CompanyForm = {
	name: string,
	email: string,
	cellPhone: number,
	document: number,
	active: boolean,
	kindCompany_id: string,
}

type ReturnType = [
  (data: CompanyForm) => AxiosPromise<QueryPayload>,
  { loading: boolean }
]

type useSaveCompanyType = () => ReturnType

const useSaveCompany: useSaveCompanyType = () => {
  const [{ loading }, execute] = useAxios<QueryPayload>({ url: '/company', method: 'PUT'}, { manual: true })

  const mutation =  (raw_data: CompanyForm) => {
    const data = removeFalsyValues(raw_data)

    if (data._id) return execute({ data })

    return execute({ data })
  }

  return [mutation, { loading }]
}

export default useSaveCompany
