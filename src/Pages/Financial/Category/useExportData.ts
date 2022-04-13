import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { CategoryType } from './types'

const useExportData = (items: CategoryType[]) => {
  const columns: ColumnType<CategoryType>[] = useMemo(() => [
    { name: 'Nome', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'financeiro_categorias'

    exportToXLS<CategoryType>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
