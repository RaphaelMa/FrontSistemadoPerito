import { FiltersType } from 'Utils/functions'

export type StatusImportType = 'not_imported' | 'importing' | 'imported' | 'error_importing'

export type LocalFiltersType = {
  dates?: any,
  processNumber?: string,
  financialSituation_id?: string[],
  situation_id?: string[],
  judicialDistrict_id?: string[],
  nature_id?: string[],
  kind_person_id?: string[],
  multicompany_id?: string[],
  person_id?: string,
  favorite?: boolean,
  statusImport_key?: StatusImportType
  statusImpeachment_id?: string[],
} & Pick<ProcessType, 'statusProcessMonitoring' | 'freeJustice'> & FiltersType

type KindPeopleType = {
  kindPeople_id: string,
  kindPeople_description: string,
}

type PeopleType = {
  people_id: string,
  people_name: string,
}

export type GenericType = {
  _id: string,
  kindPeople: KindPeopleType,
  people: PeopleType,
}

export type ProcessType = {
  _id: string,
  favorite: boolean,
  statusImpeachment?: string,
  statusImpeachment_description?: string,
  statusImpeachment_id?: string,
  multicomany_description?: string,
  multicompany_id?: string,
  processNumber: string,
  statusProcessMonitoring?: boolean,
  appointmentDate?: string,
  judicialDistrict_id?: string,
  judicialDistrict_description?: string,
  judicialDistrictLevel_id?: string,
  judicialDistrictLevel_description?: string,
  passwordProcess?: string,
  situation_id?: string,
  situation_description?: string,
  financialSituation_id?: string,
  financialSituation_description?: string,
  nature_id?: string,
  nature_description?: string,
  freeJustice?: boolean,
  acceptAppointment?: boolean,
  processValue?: number,
  honoraryValue?: number,
  arbitraryValue?: number,
  processDescription?: string,
  expert_id?: string,
  expertName?: string,
  expertiseDate?: string,
  hour?: string,
  place?: string,
  reportDays?: number,
  typeReportDays?: boolean,
  previsionReport?: string,
  deliveryReport?: string,
  clarificationReport?: string,
  clarificationDeliveryReport?: string,
  dateImpugnment?: string,
  impugnmentDays?: number,
  typeImpugnmentDays?: boolean,
  previsionImpugnment?: string,
  deliveryImpugnment?: string,
  clarificationImpugnment?: string,
  clarificationDeliveryImpugnment?: string,
  createAt: string,
  updateAt: string,
  statusImport_key?: StatusImportType,
  statusImport_description?: string,
  peoples?: GenericType[],
  activePole?: GenericType[],
  passivePole?: GenericType[],
  responsibles?: GenericType[],
  internalCode?: string,
  objetcExpert_description?: string,
  multicompany_description?: string,
  annotation?: {
    _id: string,
    annotationDate: string,
    description: string,
  }[],
  movements?: {
    _id?: string,
    annotationDate?: string,
    description?: string,
  }[],
}

type ColumnDataType = {
  description: string,
  visible: boolean,
}

export type VisibleColumnType = {
  columns: {
    createAt: ColumnDataType,
    statusImpeachment_description: ColumnDataType,
    updateAt: ColumnDataType,
    processNumber: ColumnDataType,
    internalCode: ColumnDataType,
    statusImport_description: ColumnDataType,
    appointmentDate: ColumnDataType,
    judicialDistrict_description: ColumnDataType,
    judicialDistrictLevel_description: ColumnDataType,
    situation_description: ColumnDataType,
    financialSituation_description: ColumnDataType,
    nature_description: ColumnDataType,
    acceptAppointment: ColumnDataType,
    objetcExpert_description: ColumnDataType,
    processValue: ColumnDataType,
    honoraryValue: ColumnDataType,
    arbitraryValue: ColumnDataType,
    expertName: ColumnDataType,
    expertiseDate: ColumnDataType,
    previsionReport: ColumnDataType,
    deliveryReport: ColumnDataType,
    clarificationReport: ColumnDataType,
    clarificationDeliveryReport: ColumnDataType,
    dateImpugnment: ColumnDataType,
    previsionImpugnment: ColumnDataType,
    deliveryImpugnment: ColumnDataType,
    clarificationImpugnment: ColumnDataType,
    clarificationDeliveryImpugnment: ColumnDataType
  },
  _id: string
}
