import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { JudicialDistrictLevelType } from './types'

const useExportData = (judicial_district_level: JudicialDistrictLevelType[]) => {
  const columns: ColumnType<JudicialDistrictLevelType>[] = useMemo(() => [
    { name: 'Vara', key: 'description', },
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'varas'

    exportToXLS<JudicialDistrictLevelType>(file_name, judicial_district_level, columns)
  }, [columns, judicial_district_level])

  return exportFile
}

export default useExportData
