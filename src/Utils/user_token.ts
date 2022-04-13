import moment from 'moment'
import { AES, enc } from 'crypto-js'

const PHRASE = 'C6A22DF796E9DC5DC612545B82FA7C5F529F3FE764931A00468E1AC221DAA792'

export const setToken = (raw_token: string, remember: boolean) => {
  const expires_date = remember ? moment().add(7, 'days').format() : moment().add(1, 'day').format()

  try {
    const token = AES.encrypt(raw_token, PHRASE).toString()

    window.localStorage.setItem('token', JSON.stringify({ expires_at: expires_date, remember, data: token }))
  } catch (_error) {
    // Ignora erro mesmo
    console.log(_error)
    return null
  }
}

export const getToken = (): { token: string, remember: boolean } | null => {
  const raw_value = window.localStorage.getItem('token')
  if (!raw_value) return null

  try {
    const value = JSON.parse(raw_value)
    const { remember, data, expires_at } = value

    if (moment(expires_at).isBefore()) {
      window.localStorage.removeItem('token') // Limpa o token
      return null
    }

    const token = AES.decrypt(data, PHRASE).toString(enc.Utf8)

    return { token, remember }
  } catch (_error) {
    return null
  }
}

export const updatesTokenExpiration = () => {
  const data = getToken()
  if (!data) return

  const { token, remember } = data
  setToken(token, remember) // Reseta o tempo do token
}
