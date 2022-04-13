export type ModulesType = {
  Dashboard: boolean,
  Register: boolean,
  Process: boolean,
  Schedule: boolean,
  Report: boolean,
  Historic: boolean,
  Attachment: boolean,
  Task: boolean,
  Document: boolean,
  Financial: boolean,
  TaskAutomation: boolean,
  PeopleManagement: boolean,
  Multicompany: boolean,
  DeadLine: boolean,
}

export type CompanyType = {
  plan: {
    modules: ModulesType,
    annual: boolean,
    plan_id: string,
    name: string,
    key: string,
    valuePlan: number,
    pushFree: number,
    numUser: number,
    pushFreeUsed: number,
    pushAddtional: number,
    numUserAddtional: number,
    partialValueNumUser: number,
    partialValuePushAddtional: number,
  },
  document: number,
  cep: number,
  state: string,
  city: string,
  address: string,
  active: boolean,
  kindCompany_id: string,
  kindCompanyDescription: string,
  kindCompanykey: string,
  welcome: boolean,
  trial: boolean,
  toHire: boolean,
  activeCode: boolean,
  _id: string,
  name: string,
  email: string,
  cellPhone: number,
  neighborhood?: string,
  addressNumber?: string,
}
export type kindUserType = {
  kindUser_id: string,
  kindUser_description: string,
  kindUser_key: string
}
export type PermissionsType = {
  attachment: { create: boolean, read: boolean, delete: boolean },
  billing: { read: boolean },
  company: { read: boolean, update: boolean },
  dashboard: { read: boolean },
  document: { create: boolean, read: boolean, update: boolean, delete: boolean },
  financial: { create: boolean, read: boolean, update: boolean, delete: boolean },
  historic: { read: boolean },
  judicialdistrict: { create: boolean, read: boolean, update: boolean, delete: boolean },
  keyWord: { create: boolean, read: boolean, update: boolean, delete: boolean },
  kindPeople: { create: boolean, read: boolean, update: boolean, delete: boolean },
  notification: { read: boolean, update: boolean },
  people: { create: boolean, read: boolean, update: boolean, delete: boolean },
  peoplemanagement: { read: boolean },
  plan: { read: boolean, update: boolean },
  process: { create: boolean, read: boolean, update: boolean, delete: boolean },
  processFinancialSituation: { create: boolean, read: boolean, update: boolean, delete: boolean },
  processNature: { create: boolean, read: boolean, update: boolean, delete: boolean },
  processSituation: { create: boolean, read: boolean, update: boolean, delete: boolean },
  report: { read: boolean },
  schedule: { read: boolean, update: boolean },
  task: { create: boolean, read: boolean, update: boolean, delete: boolean },
  taskAutomation: { create: boolean, read: boolean, update: boolean, delete: boolean },
  user: { create: boolean, read: boolean, update: boolean, delete: boolean },
}

export type UserStateType = {
  is_authenticated: boolean,
  loading: boolean,
  company?: CompanyType,
  trial_rest_days: number,
  account_verified: boolean,
  show_welcome_modal: boolean,
  birthday?: string, 
  permissions?: PermissionsType,
  userName?: string,
  kindUser?: kindUserType,
  has_open_payments: boolean,
}

export type CurrentUserPayloadType = {
  acecessPermission: PermissionsType | null,
  birthday: string,
  kindUser: kindUserType | null,
  email: string,
  cellPhone?: string,
  active: boolean,
  _id: string,
  name: string,
}
