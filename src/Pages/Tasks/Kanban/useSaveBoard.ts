import useAxios from 'axios-hooks'
import { ColumnType } from './Types'
import { message } from 'antd'

const useSaveBoard = () => {
  const [{ loading }, execute] = useAxios<{ success: boolean, task: ColumnType }>({
    url: '/task', method: 'POST' }
    , { manual: true })

  const mutation =  (raw_data: ColumnType, id: string) => {
    if (id) return execute({
      url: `/task/${id}`,
      method: 'PUT',
      data: raw_data,
    })

    return execute({ data: raw_data })
  }

  const save = async (raw_data: ColumnType) => {
    try {
      const resposnse = await mutation(raw_data, raw_data.column_id)

      const { success, task } = resposnse?.data

      if (success) return { success: true, task }

      message.error('Não foi possível salvar as tarefas')
      return { success: false }
    } catch (error) {
      message.error('Não foi possível salvar as tarefas')
      return { success: false }
    }
  }

  return [save, { loading }] as const
}

export default useSaveBoard
