import { documentFormatter, phoneFormatter, renderDate } from 'Utils/formatters'
import { useCallback, useMemo } from 'react'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { PersonType } from './types'

const useExportData = (people: PersonType[]) => {
  const columns: ColumnType<PersonType>[] = useMemo(() => [
    { name: 'Nome', key: 'name', },
    { name: 'Documento', key: 'document', render: (person) => documentFormatter(person.document) },
    { name: 'E-mail comercial', key: 'businessEmail' },
    { name: 'E-mail pessoal', key: 'personalEmail' },
    { name: 'Contato Comercial', key: 'businessContact', render: (person) => phoneFormatter(person.businessContact) },
    { name: 'Contato Pessoal', key: 'personalContact', render: (phone) => phoneFormatter(phone.personalContact) },
    { name: 'Aniversário', key: 'birthday', render: (person) => renderDate(person.birthday) }
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'pessoas'

    exportToXLS<PersonType>(file_name, people, columns)
  }, [columns, people])

  return exportFile
}

export default useExportData
