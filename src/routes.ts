import { lazy } from 'react'
import { ModulesType, PermissionsType } from 'Redux/Types'
import withSuspense from 'Components/withSuspense'

const Login = withSuspense(lazy(() => import('Pages/Login/Login')))
const Register = withSuspense(lazy(() => import('Pages/Register/Register')))
const PasswordRecovery = withSuspense(lazy(() => import('Pages/RecoverPassword/RecoverPassword')))
const Dashboard = withSuspense(lazy(() => import('Pages/Dashboard/Dashboard')))
const PeopleList = withSuspense(lazy(() => import('Pages/People/PeopleList')))
const KindPersonList = withSuspense(lazy(() => import('Pages/PersonKind/PersonKindList')))
const KeywordList = withSuspense(lazy(() => import('Pages/Keyword/KeywordList')))
const ProcessSituationList = withSuspense(lazy(() => import('Pages/ProcessSituation/ProcessSituationList')))
const ProcessFinancialSituationList = withSuspense(lazy(() => import('Pages/ProcessFinancialSituation/ProcessFinancialSituationList')))
const ProcessNatureList = withSuspense(lazy(() => import('Pages/ProcessNature/ProcessNatureList')))
const JudicialDistrictList = withSuspense(lazy(() => import('Pages/JudicialDistrict/JudicialDistrictList')))
const ProcessList = withSuspense(lazy(() => import('Pages/Process/ProcessList')))
const NewProcess = withSuspense(lazy(() => import('Pages/NewProcess/NewProcess')))
const Schedule = withSuspense(lazy(() => import('Pages/Schedule/Schedule')))
const History = withSuspense(lazy(() => import('Pages/History/History')))
const Users = withSuspense(lazy(() => import('Pages/Users/Users')))
const NewUser = withSuspense(lazy(() => import('Pages/NewUser/NewUser')))
const ActiveAccount = withSuspense(lazy(() => import('Pages/ActiveAccount/ActiveAccount')))
const Company = withSuspense(lazy(() => import('Pages/Company/Company')))
const Plans = withSuspense(lazy(() => import('Pages/Plans/Plans')))
const Revenues = withSuspense(lazy(() => import('Pages/Revenues/Revenues')))
const MultiCompanies = withSuspense(lazy(() => import('Pages/MultiCompanies/MultiCompanies')))
const KanbanTasks = withSuspense(lazy(() => import('Pages/Tasks/Kanban/Tasks')))
const ListTasks = withSuspense(lazy(() => import('Pages/Tasks/List/List')))
const Financial = withSuspense(lazy(() => import('Pages/Financial/Financial')))
const FinancialProcess = withSuspense(lazy(() => import('Pages/NewProcess/Tabs/FinanceProcess/FinanceProcess')))
const FinancialCategories = withSuspense(lazy(() => import('Pages/Financial/Category/Category')))
const FinancialAccounts = withSuspense(lazy(() => import('Pages/Financial/Accounts/Accounts')))
const ProcessHistory = withSuspense(lazy(() => import('Pages/NewProcess/Tabs/ProcessHistory/ProcessHistory')))
const ProcessTasks = withSuspense(lazy(() => import('Pages/NewProcess/Tabs/ProcessTasks/ProcessTasks')))
const ProcessIndicators = withSuspense(lazy(() => import('Pages/ProcessIndicators/ProcessIndicators')))
const ObjectExpertList = withSuspense(lazy(() => import('Pages/ObjectExpertList/ObjectExpertList')))
const Deadlines = withSuspense(lazy(() => import('Pages/Deadlines/Deadlines')))
const StatusImpeachments = withSuspense(lazy(() => import('Pages/StatusImpeachments/StatusImpeachments')))
const DocumentList = withSuspense(lazy(() => import('Pages/Documents/DocumentsList')))
const Document = withSuspense(lazy(() => import('Pages/Document/Document')))

type RoutesTypes = {
  path: string,
  element: JSX.Element,
  plan_module?: keyof ModulesType,
  permission?: keyof PermissionsType,
}

export const PUBLIC_ROUTES: RoutesTypes[] = [
  {
    path: '/login',
    element: Login
  }, {
    path: '/register',
    element: Register
  }, {
    path: '/recover-password',
    element: PasswordRecovery
  }
]

export const PRIVATE_ROUTES: RoutesTypes[] = [
  {
    path: '/',
    element: Dashboard,
    plan_module: 'Dashboard',
    permission: 'dashboard'
  },
  {
    path: '/active-account',
    element: ActiveAccount
  },
  {
    path: '/judicial-district',
    element: JudicialDistrictList,
    plan_module: 'Register',
    permission: 'judicialdistrict'
  },
  {
    path: '/keyword-list',
    element: KeywordList,
    plan_module: 'Register',
    permission: 'keyWord'
  },
  {
    path: '/kind-person-list',
    element: KindPersonList,
    plan_module: 'Register',
    permission: 'kindPeople'
  },
  {
    path: '/people-list',
    element: PeopleList,
    plan_module: 'Register',
    permission: 'people'
  },
  {
    path: '/plans',
    element: Plans,
    permission: 'plan'
  },
  {
    path: '/process-situation',
    element: ProcessSituationList,
    plan_module: 'Register',
    permission: 'processSituation'
  },
  {
    path: '/process-financial-situation',
    element: ProcessFinancialSituationList,
    plan_module: 'Register',
    permission: 'processFinancialSituation'
  },
  {
    path: '/process-nature',
    element: ProcessNatureList,
    plan_module: 'Register',
    permission: 'processNature'
  },
  {
    path: '/process-list',
    element: ProcessList,
    plan_module: 'Process',
    permission: 'process'
  },
  {
    path: '/process',
    element: NewProcess,
    plan_module: 'Process',
    permission: 'process'
  },
  {
    path: '/process/:id',
    element: NewProcess,
    plan_module: 'Process',
    permission: 'process'
  },
  {
    path: '/process/:id/financial',
    element: FinancialProcess,
    plan_module: 'Process',
    permission: 'process'
  },
  {
    path: '/process/:id/tasks',
    element: ProcessTasks,
    plan_module: 'Process',
    permission: 'process'
  },
  {
    permission: 'billing',
    path: '/billing',
    element: Revenues
  },
  {
    path: '/schedule',
    element: Schedule,
    plan_module: 'Schedule',
    permission: 'schedule'
  },
  {
    path: '/history',
    element: History,
    plan_module: 'Historic',
    permission: 'historic'
  },
  {
    path: '/users',
    element: Users,
    permission: 'user'
  },
  {
    path: '/user',
    element: NewUser,
    permission: 'user'
  },
  {
    path: '/user/:id',
    element: NewUser,
    permission: 'user'
  },
  {
    path: '/company',
    element: Company,
    permission: 'company'
  },
  {
    path: '/multi-companies',
    element: MultiCompanies,
    plan_module: 'Multicompany',
    permission: 'company'
  },
  {
    path: '/tasks',
    element: KanbanTasks,
    plan_module: 'Task',
    permission: 'task'
  },
  {
    path: '/tasks-list',
    element: ListTasks,
    plan_module: 'Task',
    permission: 'task'
  },
  {
    path: '/financial',
    element: Financial,
    plan_module: 'Financial',
    permission: 'financial'
  },
  {
    path: '/financial/categories',
    element: FinancialCategories,
    plan_module: 'Financial',
    permission: 'financial'
  },
  {
    path: '/financial/accounts',
    element: FinancialAccounts,
    plan_module: 'Financial',
    permission: 'financial'
  },
  {
    path: '/process/:id/history',
    element: ProcessHistory,
    plan_module: 'Process',
    permission: 'process'
  },
  {
    path: '/process-indicators/*',
    element: ProcessIndicators,
    plan_module: 'Process',
    permission: 'process'
  },
  {
    path: '/object-expert',
    element: ObjectExpertList,
    plan_module: 'Process',
    permission: 'process'
  },
  {
    path: '/deadlines',
    element: Deadlines,
    plan_module: 'DeadLine'
  },
  {
    path: '/status-impeachments',
    element: StatusImpeachments,
    plan_module: 'Register'
  },
  {
    path: '/documents',
    element: DocumentList,
    plan_module: 'Document',
    permission: 'document',
  },
  {
    path: '/document',
    element: Document,
    plan_module: 'Document',
    permission: 'document',
  },
  {
    path: '/document/:id',
    element: Document,
    plan_module: 'Document',
    permission: 'document',
  }
]
