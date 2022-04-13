import useAxios from 'axios-hooks'

export type HistoryType = {
  createAt: string,
  identifier: string,
  action: {
    action_id: string,
    action_name: string,
  }
  module: {
    module_id: string,
    module_name: string,
  }
  record: {
    _id: string,
    description: string,
  }[],
  user: {
    user_email: string,
    user_name: string,
    user_id: string,
  }
}

const useGetHistory = () => {
  const [{ loading }, execute] = useAxios<HistoryType[]>({ method: 'GET' }, { manual: true, useCache: false })

  const query =  (id: string) => execute({ url: `/history/module=task/id=${id}` })

  return [query, { loading }] as const
}

export default useGetHistory
