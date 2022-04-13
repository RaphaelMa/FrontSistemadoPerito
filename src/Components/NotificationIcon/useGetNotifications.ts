import useAxios from 'axios-hooks'

export type NotificationType = {
  module: {
    module_id: 'process' | string,
    module_name: 'Processo' | string,
  },
  _id: string,
  createAt: string,
  description: string,
  identifier: string,
  url: string,
}

const useGetNotifications = () => {
  return useAxios<NotificationType[]>({ url: '/notification', method: "GET" }, { manual: true })
}

export default useGetNotifications
