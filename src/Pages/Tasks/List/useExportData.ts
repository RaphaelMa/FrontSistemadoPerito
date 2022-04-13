import { useCallback, useMemo } from 'react'
import { renderDate } from 'Utils/formatters'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { TaskType } from './useGetTasks'

const useExportData = (items: TaskType[]) => {
  const columns: ColumnType<TaskType>[] = useMemo(() => [
    { name: 'Coluna', key: 'column_description' },
    { name: 'Título', key: 'title' },
    { name: 'Responsável', key: 'user_name' },
    { name: 'Processo', key: 'process_number' },
    { name: 'Data Entrega', key: 'deliveryDate', render: (task) => task.finished ? 'Concluído' : renderDate(task.deliveryDate) },
    { name: 'Finalizado', key: 'finished', render: (task) => task.finished ? 'Sim' : 'Não' },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'tarefas'

    exportToXLS<TaskType>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
