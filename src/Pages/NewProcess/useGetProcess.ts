import useAxios from 'axios-hooks'

type KindPeopleType = {
  kindPeople_id: string,
  kindPeople_description: string,
}

type PeopleType = {
  people_id?: string,
  people_name?: string,
}

export type ProcessType = {
  _id: string,
  favorite: boolean,
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
  createAt?: string,
  statusImport_key?: 'importing' | 'imported' | 'error_importing' | 'not_imported',
  peoples?: {
    _id: string,
    kindPeople: KindPeopleType,
    people: PeopleType,
  }[],
  activePole?: {
    _id: string,
    kindPeople: KindPeopleType,
    people: PeopleType,
  }[],
  passivePole?: {
    _id: string,
    kindPeople: KindPeopleType,
    people: PeopleType,
  }[],
  responsibles?: {
    _id: string,
    kindPeople: KindPeopleType,
    people: PeopleType,
  }[],
  annotation?: {
    _id: string,
    annotationDate: string,
    description: string,
  }[],
  movements?: {
    _id: string,
    movementDate: string,
    description: string,
    instance: string,
  }[],
  push?: {
    push_description: string,
    push_id: string,
  }
}


const useGetProcesses = () => {
  const [{ loading, data }, getProcess] = useAxios<ProcessType>({ method: "GET" }, { manual: true })

  const query = (id: string) => getProcess({ url: `/process/${id}` })

  return [{ loading, data }, query] as const
}

export default useGetProcesses
