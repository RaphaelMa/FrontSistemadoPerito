import useAxios from 'axios-hooks'

type QueryPayload = {
  success: boolean,
  token?: string,
  message?: string,
}

export const useUserRegistration = () => (
  useAxios<QueryPayload>({
    url: '/account_registration',
    method: 'POST',
  }, {
    manual: true,
  })
)

export type AreasType = {
  _id: string,
  description: string,
}

export const useGetAreas = () => (
  useAxios<AreasType[]>({
    url: '/areas',
    method: 'GET',
  }, {
    manual: true,
  })
)
