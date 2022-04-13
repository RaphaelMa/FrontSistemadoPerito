import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { ProcessFinancialSituationType } from './types'

const useExportData = (items: ProcessFinancialSituationType[]) => {
  const columns: ColumnType<ProcessFinancialSituationType>[] = useMemo(() => [
    { name: 'Descrição', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'situacao_financeira_do_processo'

    exportToXLS<ProcessFinancialSituationType>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
