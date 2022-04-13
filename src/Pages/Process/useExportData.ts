import { useCallback, useMemo } from 'react'
import { ProcessType, VisibleColumnType, GenericType } from './types'
import moment from 'moment'
import { currencyFormatter } from 'Utils/formatters'
import { exportToXLS } from 'Utils/functions'

const MOMENT_FORMAT = 'YYYY/MM/DD'
const DEFAULT_FORMAT = 'DD/MM/YYYY'

const renderDate = (date?: string) => date ? moment(date, MOMENT_FORMAT).format(DEFAULT_FORMAT) : undefined

const renderPeople = (data?: GenericType[]) => {
  return data?.reduce((acc, curr, index) => {
    const suffix = index + 1 < data!.length ? ', ' : ''

    return `${acc}${curr.kindPeople.kindPeople_description + ' - ' + curr.people.people_name}${suffix}`
  }, '')
}

const useExportData = (processes: ProcessType[], visible_columns?: VisibleColumnType) => {
  const columns = useMemo(() => [
    { name: 'Data de Criação', key: 'createAt', render: (process: ProcessType) => renderDate(process.createAt) },
    { name: 'Última atualização', key: 'updateAt', render: (process: ProcessType) => renderDate(process.updateAt) },
    { name: 'Número do Processo', key: 'processNumber' },
    { name: 'Código Interno', key: 'internalCode' },
    { name: 'Status Importação', key: 'statusImport_description' },
    { name: 'Pessoas', key: 'peoples', render: (process: ProcessType) => renderPeople(process.peoples) },
    { name: 'Polo Ativo', key: 'activePole', render: (process: ProcessType) => renderPeople(process.activePole) },
    { name: 'Polo Passivo', key: 'passivePole', render: (process: ProcessType) => renderPeople(process.passivePole) },
    {
      name: 'Data nomeação',
      key: 'appointmentDate',
      render: (process: ProcessType) => renderDate(process.appointmentDate)
    },
    { name: 'Comarca', key: 'judicialDistrict_description' },
    { name: 'Vara', key: 'judicialDistrictLevel_description' },
    { name: 'Situação do Processo', key: 'situation_description' },
    { name: 'Situação Financeira do Processo', key: 'financialSituation_description' },
    { name: 'Natureza', key: 'nature_description' },
    { name: 'Ação/Objeto Perícia', key: 'objetcExpert_description' },
    {
      name: 'Valor Processo',
      key: 'processValue',
      render: (process: ProcessType) => currencyFormatter(process.processValue, { cents: true })
    },
    {
      name: 'Honorário Apresentado',
      key: 'honoraryValue',
      render: (process: ProcessType) => currencyFormatter(process.honoraryValue, { cents: true })
    },
    {
      name: 'Honorário Arbitrario',
      key: 'arbitraryValue',
      render: (process: ProcessType) => currencyFormatter(process.arbitraryValue, { cents: true })
    },
    { name: 'Perito ou Asistente', key: 'expertName' },
    { name: 'Data Perícia', key: 'expertiseDate', render: (process: ProcessType) => renderDate(process.expertiseDate) },
    {
      name: 'Previsão Entrega Laudo',
      key: 'previsionReport',
      render: (process: ProcessType) => renderDate(process.previsionReport)
    },
    {
      name: 'Entrega Laudo',
      key: 'deliveryReport',
      render: (process: ProcessType) => renderDate(process.deliveryReport)
    },
    {
      name: 'Aceitou a nomeação',
      key: 'acceptAppointment',
      render: (process: ProcessType) => process.acceptAppointment ? 'Sim' : 'Não'
    },
    {
      name: 'Limite Esc. Laudo',
      key: 'clarificationReport',
      render: (process: ProcessType) => renderDate(process.clarificationReport)
    },
    {
      name: 'Entrega Esc. Laudo',
      key: 'clarificationDeliveryReport',
      render: (process: ProcessType) => renderDate(process.clarificationDeliveryReport)
    },
    { name: 'Impugnação', key: 'dateImpugnment', render: (process: ProcessType) => renderDate(process.dateImpugnment) },
    {
      name: 'Status Impugnação',
      key: 'statusImpeachment',
      render: (process: ProcessType) => process.statusImpeachment_description
    },
    {
      name: 'Previsão Entrega Impugnação',
      key: 'previsionImpugnment',
      render: (process: ProcessType) => renderDate(process.previsionImpugnment)
    },
    {
      name: 'Entrega Impugnação',
      key: 'deliveryImpugnment',
      render: (process: ProcessType) => renderDate(process.deliveryImpugnment)
    },
    {
      name: 'Limite Esc. Impugnação',
      key: 'clarificationImpugnment',
      render: (process: ProcessType) => renderDate(process.clarificationImpugnment)
    },
    {
      name: 'Entrega Esc. Impugnação',
      key: 'clarificationDeliveryImpugnment',
      render: (process: ProcessType) => renderDate(process.clarificationDeliveryImpugnment)
    }
  ], [])

  const filtered_columns = useMemo(() => {
    return columns.filter((column) => {
      if (!visible_columns?.columns) return true

      const key = column.key
      // @ts-ignore
      const is_visible = visible_columns.columns[key]?.visible

      return !!is_visible
    })
  }, [columns, visible_columns])

  return useCallback(() => {
    const file_name = 'processos'

    exportToXLS<ProcessType>(file_name, processes, filtered_columns)
  }, [filtered_columns, processes])
}

export default useExportData
