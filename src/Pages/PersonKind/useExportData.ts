import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { PersonKindType } from './types'

const useExportData = (people_kind: PersonKindType[]) => {
  const columns: ColumnType<PersonKindType>[] = useMemo(() => [
    { name: 'Tipo Pessoa', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'tipo_pessoa'

    exportToXLS<PersonKindType>(file_name, people_kind, columns)
  }, [columns, people_kind])

  return exportFile
}

export default useExportData
