import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { ProcessSituationType } from './types'

const useExportData = (items: ProcessSituationType[]) => {
  const columns: ColumnType<ProcessSituationType>[] = useMemo(() => [
    { name: 'Descrição', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'situacao_do_processo'

    exportToXLS<ProcessSituationType>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
