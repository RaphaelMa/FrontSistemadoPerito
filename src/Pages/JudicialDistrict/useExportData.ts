import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { JudicialDistrictType } from './types'

const useExportData = (judicial_district: JudicialDistrictType[]) => {
  const columns: ColumnType<JudicialDistrictType>[] = useMemo(() => [
    { name: 'Comarca', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'comarcas'

    exportToXLS<JudicialDistrictType>(file_name, judicial_district, columns)
  }, [columns, judicial_district])

  return exportFile
}

export default useExportData
