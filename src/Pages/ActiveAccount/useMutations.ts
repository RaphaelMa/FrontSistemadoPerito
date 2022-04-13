import useAxios from 'axios-hooks'

type Payload = {
  activeAccount?: string,
  success: boolean,
  message?: string
  key?: string
}

export const useActiveAccount = () => (
  useAxios<Payload>({
    url: '/activeAccount',
    method: 'PUT',
  }, { manual: true })
)

export const useResendCode = () => (
  useAxios<Payload>({
    url: '/activeAccount',
    method: 'POST',
  }, {
    manual: true,
  })
)
