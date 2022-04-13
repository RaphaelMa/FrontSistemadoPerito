import React, { useCallback, useMemo } from 'react'
import { ProcessType, VisibleColumnType, GenericType } from './types'
import { currencyFormatter } from 'Utils/formatters'
import { useUserSelector } from 'Redux/UserReducer'
import { ColumnsType } from 'antd/es/table'
import { Tag } from 'antd'
import ActionButtons from './ActionButtons'
import moment from 'moment'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  updateProcessPushStatus: (process_id: string, status: boolean) => void,
  updateProcessFavorite: (process_id: string, value: boolean) => void,
  visible_columns?: VisibleColumnType,
}

export const IMPORTED_KEYS = {
  not_imported: '#5A6978',
  importing: '#FFD541',
  imported: '#3CA49E',
  error_importing: '#F00C0C'
}

const MOMENT_FORMAT = 'YYYY/MM/DD'
const DEFAULT_FORMAT = 'DD/MM/YYYY'

const useColumns = (props: UseColumnsProps) => {
  const { handleDelete, handleEdit, updateProcessPushStatus, visible_columns, updateProcessFavorite } = props
  const plan_modules = useUserSelector(state => state.company?.plan.modules)

  const orderProcess = useCallback((a: ProcessType, b: ProcessType, key: keyof ProcessType) => {
    const value_a = a[key]
    const value_b = b[key]

    if (!value_a) return 1
    if (!value_b) return -1
    if (value_a < value_b) return -1
    if (value_a > value_b) return 1

    return 0
  }, [])

  const renderDate = useCallback((date: any) => date ? moment(date, MOMENT_FORMAT).format(DEFAULT_FORMAT) : null, [])

  return useMemo(() => {
    const columns: ColumnsType<ProcessType> = [{
      title: 'Data de Criação',
      dataIndex: 'createAt',
      key: 'createAt',
      width: 140,
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => orderProcess(a, b, 'createAt'),
      render: renderDate
    }, {
      title: 'Última atualização',
      dataIndex: 'updateAt',
      key: 'updateAt',
      width: 160,
      align: 'center',
      sorter: (a, b) => orderProcess(a, b, 'updateAt'),
      render: renderDate
    }, {
      title: 'Número do Processo',
      dataIndex: 'processNumber',
      ellipsis: true,
      key: 'processNumber',
      width: 170,
      sorter: (a, b) => orderProcess(a, b, 'processNumber')
    }, {
      title: 'Pessoas',
      key: 'peoples',
      dataIndex: 'peoples',
      ellipsis: true,
      width: 220,
      render: renderPeople
    }, {
      title: 'Polo Ativo',
      key: 'activePole',
      dataIndex: 'activePole',
      ellipsis: true,
      width: 220,
      render: renderPeople
    }, {
      title: 'Polo Passivo',
      key: 'passivePole',
      dataIndex: 'passivePole',
      ellipsis: true,
      width: 220,
      render: renderPeople
    }, {
      title: 'Código Interno',
      key: 'internalCode',
      dataIndex: 'internalCode',
      ellipsis: true,
      width: 170,
      sorter: (a, b) => orderProcess(a, b, 'internalCode')
    }, {
      title: 'Status Importação',
      dataIndex: 'statusImport_description',
      ellipsis: true,
      key: 'statusImport_description',
      align: 'center',
      width: 140,
      sorter: (a, b) => orderProcess(a, b, 'statusImport_description'),
      render: (_, record) => {
        if (!record.statusImport_key) return null

        return (
          <Tag color={IMPORTED_KEYS[record.statusImport_key]}>
            {record.statusImport_description}
          </Tag>
        )
      }
    }, {
      title: 'Data nomeação',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      width: 150,
      align: 'center',
      sorter: (a, b) => orderProcess(a, b, 'appointmentDate'),
      render: renderDate
    }, {
      title: 'Comarca',
      key: 'judicialDistrict_description',
      dataIndex: 'judicialDistrict_description',
      width: 220,
      ellipsis: true,
      sorter: (a, b) => orderProcess(a, b, 'judicialDistrict_description')
    }, {
      title: 'Vara',
      key: 'judicialDistrictLevel_description',
      dataIndex: 'judicialDistrictLevel_description',
      width: 220,
      ellipsis: true,
      sorter: (a, b) => orderProcess(a, b, 'judicialDistrictLevel_description')
    }, {
      title: 'Situação do Processo',
      dataIndex: 'situation_description',
      ellipsis: true,
      width: 220,
      key: 'situation_description',
      sorter: (a, b) => orderProcess(a, b, 'situation_description')
    }, {
      title: 'Situação Financeira do Processo',
      dataIndex: 'financialSituation_description',
      ellipsis: true,
      width: 240,
      key: 'financialSituation_description',
      sorter: (a, b) => orderProcess(a, b, 'financialSituation_description')
    }, {
      title: 'Natureza',
      key: 'nature_description',
      dataIndex: 'nature_description',
      width: 220,
      ellipsis: true,
      sorter: (a, b) => orderProcess(a, b, 'nature_description')
    }, {
      title: 'Ação/Objeto Perícia',
      key: 'objetcExpert_description',
      dataIndex: 'objetcExpert_description',
      width: 220,
      ellipsis: true,
      sorter: (a, b) => orderProcess(a, b, 'objetcExpert_description')
    }, {
      title: 'Valor Processo',
      key: 'processValue',
      dataIndex: 'processValue',
      width: 160,
      sorter: (a, b) => orderProcess(a, b, 'processValue'),
      render: (_, value) => currencyFormatter(value.processValue, { cents: true })
    }, {
      title: 'Honorário Apresentado',
      key: 'honoraryValue',
      dataIndex: 'c',
      width: 180,
      sorter: (a, b) => orderProcess(a, b, 'honoraryValue'),
      render: (_, data) => currencyFormatter(data.honoraryValue, { cents: true })
    }, {
      title: 'Honorário Arbitrario',
      key: 'arbitraryValue',
      dataIndex: 'arbitraryValue',
      width: 160,
      sorter: (a, b) => orderProcess(a, b, 'arbitraryValue'),
      render: (value) => currencyFormatter(value, { cents: true })
    }, {
      title: 'Perito ou Asistente',
      key: 'expertName',
      dataIndex: 'expertName',
      width: 220,
      ellipsis: true,
      sorter: (a, b) => orderProcess(a, b, 'expertName')
    }, {
      title: 'Data Perícia',
      dataIndex: 'expertiseDate',
      key: 'expertiseDate',
      width: 150,
      align: 'center',
      sorter: (a, b) => orderProcess(a, b, 'expertiseDate'),
      render: renderDate
    }, {
      title: 'Previsão Entrega Laudo',
      dataIndex: 'previsionReport',
      key: 'previsionReport',
      align: 'center',
      width: 200,
      sorter: (a, b) => orderProcess(a, b, 'previsionReport'),
      render: renderDate
    }, {
      title: 'Entrega Laudo',
      dataIndex: 'deliveryReport',
      key: 'deliveryReport',
      align: 'center',
      width: 130,
      sorter: (a, b) => orderProcess(a, b, 'deliveryReport'),
      render: renderDate
    }, {
      title: 'Limite Esc. Laudo',
      dataIndex: 'clarificationReport',
      key: 'clarificationReport',
      align: 'center',
      width: 160,
      sorter: (a, b) => orderProcess(a, b, 'clarificationReport'),
      render: renderDate
    }, {
      title: 'Entrega Esc. Laudo',
      dataIndex: 'clarificationDeliveryReport',
      key: 'clarificationDeliveryReport',
      align: 'center',
      width: 180,
      sorter: (a, b) => orderProcess(a, b, 'clarificationDeliveryReport'),
      render: renderDate
    }, {
      title: 'Aceitou a nomeação',
      key: 'acceptAppointment',
      dataIndex: 'acceptAppointment',
      align: 'center',
      width: 110,
      render: value => value ? 'Sim' : 'Não'
    }, {
      title: 'Impugnação',
      dataIndex: 'dateImpugnment',
      key: 'dateImpugnment',
      align: 'center',
      width: 130,
      sorter: (a, b) => orderProcess(a, b, 'dateImpugnment'),
      render: renderDate
    }, {
      title: 'Status Impugnação',
      dataIndex: 'statusImpeachment_description',
      key: 'statusImpeachment',
      align: 'center',
      width: 180,
      sorter: (a, b) => orderProcess(a, b, 'statusImpeachment_description')
    }, {
      title: 'Previsão Entrega Impugnação',
      dataIndex: 'previsionImpugnment',
      key: 'previsionImpugnment',
      align: 'center',
      width: 230,
      sorter: (a, b) => orderProcess(a, b, 'previsionImpugnment'),
      render: renderDate
    }, {
      title: 'Entrega Impugnação',
      dataIndex: 'deliveryImpugnment',
      key: 'deliveryImpugnment',
      align: 'center',
      width: 180,
      sorter: (a, b) => orderProcess(a, b, 'deliveryImpugnment'),
      render: renderDate
    }, {
      title: 'Limite Esc. Impugnação',
      dataIndex: 'clarificationImpugnment',
      key: 'clarificationImpugnment',
      align: 'center',
      width: 210,
      sorter: (a, b) => orderProcess(a, b, 'clarificationImpugnment'),
      render: renderDate
    }, {
      title: 'Entrega Esc. Impugnação',
      dataIndex: 'clarificationDeliveryImpugnment',
      key: 'clarificationDeliveryImpugnment',
      align: 'center',
      width: 210,
      sorter: (a, b) => orderProcess(a, b, 'clarificationDeliveryImpugnment'),
      render: renderDate
    }, {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 180,
      fixed: 'right',
      render: (process: ProcessType) => (
        <ActionButtons
          process={process}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          updateProcessFavorite={updateProcessFavorite}
          updateProcessPushStatus={updateProcessPushStatus}
        />
      )
    }]

    if (plan_modules?.Multicompany) {
      const company_column = {
        title: 'Empresa',
        dataIndex: 'multicompany_description',
        ellipsis: true,
        width: 220,
        key: 'multicompany_description',
        sorter: (a: ProcessType, b: ProcessType) => orderProcess(a, b, 'multicompany_description')
      }

      columns.splice(2, 0, company_column)
    }

    // @ts-ignore
    return columns.filter(column => column.key === 'actions' ? true : visible_columns?.columns[column.key]?.visible)
  }, [handleDelete,
    handleEdit,
    orderProcess,
    plan_modules,
    renderDate,
    updateProcessFavorite,
    updateProcessPushStatus,
    visible_columns
  ])
}

export default useColumns

const renderPeople = (data?: GenericType[]) => (
  data?.map((people: GenericType) => (
    <div key={people._id}>{people.kindPeople.kindPeople_description} - {people.people.people_name}</div>
  ))
)
