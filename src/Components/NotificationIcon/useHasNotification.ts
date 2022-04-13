import useAxios from 'axios-hooks'

type QueryPayload = {
  success: boolean,
  notification: boolean,
}

const useHasNotification = () => {
  return useAxios<QueryPayload>({ url: '/hasNotification', method: "GET" }, { manual: true })
}

export default useHasNotification
