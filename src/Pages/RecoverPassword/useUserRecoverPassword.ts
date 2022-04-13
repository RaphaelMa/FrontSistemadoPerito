import useAxios from 'axios-hooks'

type QueryPayload = {
  success: boolean,
  message?: string,
}

const useUserPasswordRecovery = () => (
  useAxios<QueryPayload>(
    {
      url: '/recover_password',
      method: 'POST',
    },
    {
      manual: true,
    },
  )
)

export default useUserPasswordRecovery
