import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { StatusImpeachment } from './types'

const useExportData = (items: StatusImpeachment[]) => {
  const columns: ColumnType<StatusImpeachment>[] = useMemo(() => [
    { name: 'Status Impugnação', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'status_impugnacao'

    exportToXLS<StatusImpeachment>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
