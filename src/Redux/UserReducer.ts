import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import { setAxiosToken } from 'Utils/axios_configuration'
import { UserStateType, CompanyType, PermissionsType, kindUserType } from './Types'
import { getToken, setToken } from 'Utils/user_token'

const INITIAL_STATE: UserStateType = {
  is_authenticated: !!getToken()?.token,
  loading: false,
  trial_rest_days: 0,
  account_verified: true,
  show_welcome_modal: false,
  has_open_payments: false
}

export type UserActionType =
  | { type: 'LOGIN', payload: { token: string, remember: boolean } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_INITIAL_DATA', payload: { company: CompanyType, trial_rest_days: number, permissions: PermissionsType, birthday: string, kindUser: kindUserType, userName: string } }
  | { type: 'UPDATE_COMPANY', payload: CompanyType }
  | { type: 'SET_ACTIVE_ACCOUNT', payload: boolean }
  | { type: 'SET_SHOW_WELCOME_MODAL', payload: boolean }
  | { type: 'SET_TRIAL', payload: { trial: boolean, days: number } }
  | { type: 'SET_HAS_OPEN_PAYMENTS', payload: boolean }

type useUserDispatchType = () => (action: UserActionType) => void

export const useUserSelector: TypedUseSelectorHook<UserStateType> = useSelector

export const useUserDispatch: useUserDispatchType = useDispatch

const userReducer = (state = INITIAL_STATE, action: UserActionType) => {
  switch (action.type) {
    case 'LOGIN':
      setToken(action.payload.token, action.payload.remember)
      setAxiosToken()

      return { ...state, is_authenticated: true }
    case 'LOGOUT':
      localStorage.removeItem('token')
      localStorage.removeItem(`${state.company?.email}:process-filters-list`)

      return { ...state, is_authenticated: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_INITIAL_DATA':
      const { company, trial_rest_days, permissions, birthday, kindUser, userName } = action.payload
      const account_verified = company.activeCode
      const show_welcome_modal = company.welcome

      return {
        ...state,
        company,
        trial_rest_days,
        account_verified,
        show_welcome_modal,
        loading: false,
        birthday,
        permissions,
        kindUser,
        userName
      }
    case 'SET_ACTIVE_ACCOUNT':
      return { ...state, account_verified: action.payload }
    case 'SET_SHOW_WELCOME_MODAL':
      return { ...state, show_welcome_modal: action.payload }
    case 'UPDATE_COMPANY':
      return { ...state, company: action.payload }
    case 'SET_TRIAL':
      const { company: old_company } = state
      const new_company = { ...old_company!, trial: action.payload.trial }
      return { ...state, company: new_company, trial_rest_days: action.payload.days }
    case 'SET_HAS_OPEN_PAYMENTS':
      return { ...state, has_open_payments: action.payload }
    default:
      return state
  }
}

const store = createStore(userReducer)

export default store