import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export const sortBy = <ArrType extends any[]>(
  arr: ArrType,
  sort_by: string | number,
  options: { order?: 'ascend' | 'descend' } = { order: 'ascend' }
) => {
  return [...arr].sort((a, b) => {
    const keyA = a[sort_by]
    const keyB = b[sort_by]

    if (options.order === 'ascend') {
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
    } else {
      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
    }

    return 0
  })
}

// remove +()' ' do telefone
export const normalizePhone = (phone: string): string => phone.replace(/[^\d+]+/g, '')

export const scapeRegex = (value: string): string => value.replace(/[,.]/g, '')

export type FiltersType = {
  search?: string,
  pagination: {
    current_page: number,
    page_size: number,
  },
  sort: {
    field: string,
    order: 'ascend' | 'descend',
  }
}

type FilterData = {
  filters: FiltersType,
  columns_keys: string[]
}

export const filterData = <T extends object>({ data, filters, columns_keys }: { data: T[] } & FilterData): T[] => {
  let filtered_data: T[] = data

  if (filters.search) {
    const search_lowercase = filters.search.toLowerCase()

    filtered_data = data.filter(item => {
      // @ts-ignore
      const value_matched = columns_keys.find(column_key => item[column_key]?.toLowerCase().match(search_lowercase))

      return value_matched ? item : null
    })
  }

  return sortBy(filtered_data, filters.sort.field, { order: filters.sort.order })
}

export const removeFalsyValues = (object: Record<string | number, any>) => {
  const not_falsys = [false, 0]

  return (
    Object.entries(object)
      .reduce((reduced, [key, value]) => {
        if (value && typeof value === 'object') {
          reduced[key] = removeFalsyValues(value)
        } else if (Boolean(value) || not_falsys.includes(value)) {
          reduced[key] = value
        }

        return reduced
      }, {} as Record<string | number, any>)
  )
}

// normalize remove acentos
export const normalizeString = (str: string) => (
  str.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
)

export type ColumnType<ItemType> = {
  name: string;
  key: string;
  render?: (item: ItemType) => string | undefined;
}

const FILE_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

const FILE_EXTENSION = '.xlsx'

export const exportToXLS = <ItemType>(filename: string, items: ItemType[], columns: ColumnType<ItemType>[]) => {
  const data = items.map((item) => {
    return columns.reduce((acc, column) => {
      // @ts-ignore
      const value = item[column.key]

      if (typeof column.render === 'function') return { ...acc, [column.name]: column.render(item) }

      return { ...acc, [column.name]: value }
    }, {})
  })

  const work_sheet = XLSX.utils.json_to_sheet(data)

  const work_book = { Sheets: { 'data': work_sheet }, SheetNames: ['data'] }

  const excel_buffer = XLSX.write(work_book, { bookType: 'xlsx', type: 'array' })

  const file = new Blob([excel_buffer], {type: FILE_TYPE})

  FileSaver.saveAs(file, filename + FILE_EXTENSION)
}
