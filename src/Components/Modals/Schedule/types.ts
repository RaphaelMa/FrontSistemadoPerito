export type Schedule = {
  _id: string,
  __v: number
  expertName: string,
  place: string,
  processNumber: string,
  honoraryValue: number | string,
  previsionReport: string,
  deadLine_description: string,
  scheduleStatus_description: string,
  scheduleStatus_color: string,
  expertiseDate: string,
  hour: string,
  process_id: string,
  scheduleStatus_id: string,
}

type Kind = {
  kindPeople_id: string,
  kindPeople_description: string,
}

type PeopleType = {
  people_id: string,
  people_name: string,
}

type GenericType = {
  _id: string,
  kindPeople: Kind,
  people: PeopleType,
}

type ProcessData = {
  _id: string,
  peoples: GenericType[],
  activePole: GenericType[],
  passivePole: GenericType[],
  //Laudo
  previsionReport?: string,
  clarificationReport?: string,
  clarificationDeliveryReport?: string,
  deliveryReport?: string,
  // Impugnação
  clarificationImpugnment?: string,
  clarificationDeliveryImpugnment?: string,
  previsionImpugnment?: string,
  deliveryImpugnment?: string,
}

export type ProcessType = {
  schedule: Schedule,
  processData: ProcessData,
  success: boolean,
  message?: string,
}

export type Status = {
  _id: string,
  description: string,
  color: string
}
