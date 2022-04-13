import api from 'Utils/axios_configuration'
import messageError from 'Utils/messageError'
import store from './UserReducer'
import { getToken } from 'Utils/user_token'
import { CompanyType, CurrentUserPayloadType } from './Types'

const { dispatch } = store

type CompanyRequestType = {
  key: string,
  message: string,
  success: boolean,
} & CompanyType

const default_permissions = {
  attachment: { create: true, read: true, delete: true },
  billing: { read: true },
  company: { read: true, update: true },
  dashboard: { read: true },
  document: { create: true, read: true, update: true, delete: true },
  financial: { create: true, read: true, update: true, delete: true },
  historic: { read: true },
  judicialdistrict: { create: true, read: true, update: true, delete: true },
  keyWord: { create: true, read: true, update: true, delete: true },
  kindPeople: { create: true, read: true, update: true, delete: true },
  notification: { read: true, update: true },
  people: { create: true, read: true, update: true, delete: true },
  peoplemanagement: { read: true },
  plan: { read: true, update: true },
  process: { create: true, read: true, update: true, delete: true },
  processFinancialSituation: { create: true, read: true, update: true, delete: true },
  processNature: { create: true, read: true, update: true, delete: true },
  processSituation: { create: true, read: true, update: true, delete: true },
  report: { read: true },
  schedule: { read: true, update: true },
  task: { create: true, read: true, update: true, delete: true },
  taskAutomation: { create: true, read: true, update: true, delete: true },
  user: { create: true, read: true, update: true, delete: true },
}

export const fetchInitalData = async () => {
  const token = getToken()?.token
  // Pasando o token pq tem um delay até o axios setar o token, assim garante que sempre vai dar certo.
  const company_query =  api.get<CompanyRequestType>('/company', { headers: { authorization: `Bearer ${token}` } })
  // const current_user_query =  api.get<CompanyRequestType>('/current_user', { headers: { authorization: `Bearer ${token}` } })
  dispatch({ type: 'SET_LOADING', payload: true })

  try {
    const response = await Promise.all([company_query])
    const { success, key } = response[0].data
    if (!success && key === 'activeCode') {
      dispatch({ type: 'SET_ACTIVE_ACCOUNT', payload: false })
      dispatch({ type: 'SET_LOADING', payload: false })
      return
    }

    const company = response[0]?.data
    const trial = response[0]?.data?.trial
    const trial_rest_days = await fetchTrialDays(trial, token)
    const current_user = await fetchCurrentUser(token)

    const permissions = current_user?.acecessPermission || default_permissions
    const birthday = current_user?.birthday || ''
    const userName = current_user?.name || ''
   
    const kindUser = current_user?.kindUser || {kindUser_id: '', kindUser_description: '', kindUser_key: ''}

    dispatch({ type: 'SET_INITIAL_DATA',  payload: { company, trial_rest_days: trial_rest_days, permissions: permissions, birthday: birthday, kindUser: kindUser, userName: userName } })
  } catch (error) {
    console.log(error)
    messageError('202010311855')
    dispatch({ type: 'SET_LOADING', payload: false })
  }
}

const fetchTrialDays = async (trial: boolean, token?: string) => {
  if (!trial) return 0

  try {
    // Pasando o token pq tem um delay até o axios setar o token, assim garante que sempre vai dar certo.
    const { data } =  await api.get<{ success: boolean, restDays: number }>('/trial', { headers: { authorization: `Bearer ${token}` } })
    const { success, restDays } = data
    if (!success) return 0

    return restDays
  } catch (error) {
    return 0;
  }
}

const fetchCurrentUser = async (token?: string) => {
  try {
    const { data } =  await api.get<CurrentUserPayloadType>('/currentuser', { headers: { authorization: `Bearer ${token}` } })

    return data
  } catch (error) {
    return null
  }
}

type UserLoginVars = {
  remember: boolean,
  email: string,
  password: string,
}

type LoginPayload = {
  success: boolean,
  token?: string,
  email?: string,
  key?: string,
  message?: string,
}

export const userLogin = async ({ remember, ...user }: UserLoginVars) => {
  let response = null
  dispatch({ type: 'SET_LOADING', payload: true })

  try {
    response = await api.post<LoginPayload>('/session', { ...user })
  } catch (error) {
    messageError('202008151654')
    dispatch({ type: 'SET_LOADING', payload: false })
    return
  }

  const success = response?.data.success
  if (success) {
    const token = response?.data.token || ''

    dispatch({ type: 'LOGIN', payload: { token, remember } })
    return Promise.resolve()
  }

  dispatch({ type: 'SET_LOADING', payload: false })
  return Promise.reject({ key: response?.data.key, message: response?.data.message })
}

export const updateCompanyData = async () => {
  const token = getToken()?.token
  // Pasando o token pq tem um delay até o axios setar o token, assim garante que sempre vai dar certo.
  const response = await api.get<CompanyRequestType>('/company', { headers: { authorization: `Bearer ${token}` } })

  const company = response.data
  dispatch({ type: 'UPDATE_COMPANY',  payload: company })
}
