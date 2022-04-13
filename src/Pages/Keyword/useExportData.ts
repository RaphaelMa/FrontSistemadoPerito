import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { KeywordType } from './types'

const useExportData = (keyword: KeywordType[]) => {
  const columns: ColumnType<KeywordType>[] = useMemo(() => [
    { name: 'Descrição', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'palavra_chave'

    exportToXLS<KeywordType>(file_name, keyword, columns)
  }, [columns, keyword])

  return exportFile
}

export default useExportData
