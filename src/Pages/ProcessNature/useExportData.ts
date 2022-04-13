import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { ProcessNatureType } from './types'

const useExportData = (items: ProcessNatureType[]) => {
  const columns: ColumnType<ProcessNatureType>[] = useMemo(() => [
    { name: 'Descrição', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'natureza_do_processo'

    exportToXLS<ProcessNatureType>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
