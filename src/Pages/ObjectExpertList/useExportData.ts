import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { ObjectExpertType } from './types'

const useExportData = (items: ObjectExpertType[]) => {
  const columns: ColumnType<ObjectExpertType>[] = useMemo(() => [
    { name: 'Ação/Objeto do Processo', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'acao_objeto_do_processo'

    exportToXLS<ObjectExpertType>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
