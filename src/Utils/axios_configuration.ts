import { configure } from 'axios-hooks'
import { getToken } from 'Utils/user_token'
import { message } from 'antd'
import Axios from 'axios'
import errorModal from 'Utils/errorModal'
import store from 'Redux/UserReducer'

const { dispatch } = store

const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://teste.sistemadoperito.com.br/'
  : 'http://test.sistemadoperito.com.br/'

const DEFAULT_CONFIGURATION = {
  baseURL: baseURL,
  timeout: 60000,
}

export const setupAxios = () => {
  const axios = Axios.create(DEFAULT_CONFIGURATION)

  configure({ axios })
}

const logoutUser = (raw_data: any) => {
  try {
    const data = JSON.parse(raw_data)

    if (!data.success && data.key === 'erro_token') {
      localStorage.removeItem('token')
      setTimeout(message.destroy, 100)
      errorModal({ content: data.message }, 3000)
      setTimeout(() => window.location.href = '/login', 2500)
    }

    if (!data.success && data.key === 'trial_off' && !window.location.href.includes('/plans')) {
      setTimeout(message.destroy, 100)
      errorModal({ content: data.message }, 2500)
      setTimeout(() => window.location.href = '/plans', 2500)
    }

    if (!data.success && data.key === 'payment_open') {
      if (!window.location.href.includes('/billing')) {
        dispatch({ type: 'SET_HAS_OPEN_PAYMENTS', payload: true })
        setTimeout(message.destroy, 100)
        errorModal({ content: data.message }, 3000)
        setTimeout(() => window.location.href = '/billing', 2500)
      }
    }
  } catch (error) { /* ignore error */ }

  return raw_data
}

export const setAxiosToken = () => {
  let transform_response = Axios.defaults.transformResponse
  if (transform_response === undefined) transform_response = []
  if (!Array.isArray(transform_response)) transform_response = [transform_response]
  const token = getToken()?.token

  const axios = Axios.create({
    ...DEFAULT_CONFIGURATION,
    headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    transformResponse: [
      (raw_data) => logoutUser(raw_data),
      ...transform_response
    ]
  })

  configure({ axios })
}

const api = Axios.create({ ...DEFAULT_CONFIGURATION })

export default api
