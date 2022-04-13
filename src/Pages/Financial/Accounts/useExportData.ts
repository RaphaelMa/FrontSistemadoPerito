import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { Account } from './types'

const useExportData = (items: Account[]) => {
  const columns: ColumnType<Account>[] = useMemo(() => [
    { name: 'Nome', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'financeiro_contas'

    exportToXLS<Account>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
