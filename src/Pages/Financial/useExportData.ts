import { useCallback, useMemo } from 'react'
import { currencyFormatter, renderDate } from 'Utils/formatters'
import { exportToXLS, ColumnType } from 'Utils/functions'
import { FinancialType } from './types'

const useExportData = (items: FinancialType[]) => {
  const columns: ColumnType<FinancialType>[] = useMemo(() => [
    { name: 'Vencimento', key: 'expirationDate', render: (financial) => renderDate(financial.expirationDate) },
    { name: 'Pagamento', key: 'paymentDate', render: (financial) => renderDate(financial.paymentDate) },
    { name: 'Conta', key: 'financialAccount_description' },
    { name: 'Nº do Processo', key: 'process_number' },
    { name: 'Categoria', key: 'category_description' },
    { name: 'Movimentação', key: 'movement_description' },
    { name: 'Valor', key: 'value', render: (financial) => currencyFormatter(financial.value, { cents: true }) },
    { name: 'Desconto', key: 'discount', render: (financial) => currencyFormatter(financial.discount, { cents: true }) },
    { name: 'Total', key: 'total', render: (financial) => currencyFormatter(financial.total, { cents: true }) },
    { name: 'Qtd. Parcelas', key: 'porcentReceptiValue', render: (financial) =>  currencyFormatter(financial.value, { cents: true  }) },
    { name: 'Valor a Receber Parcelado', key: 'recepetPartial', render: (financial) =>  currencyFormatter(financial.value, { cents: true  }) }
  ], [])

  const exportFile = useCallback(() => {
    const file_name = 'financeiro'

    exportToXLS<FinancialType>(file_name, items, columns)
  }, [columns, items])

  return exportFile
}

export default useExportData
