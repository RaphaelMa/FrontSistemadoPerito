import React, { useEffect, memo } from 'react'
import { useUserSelector } from 'Redux/UserReducer'
import { RouteProps, Navigate, useLocation } from 'react-router'
import { Route } from 'react-router-dom'
import { updatesTokenExpiration } from 'Utils/user_token'
import { ModulesType, PermissionsType } from 'Redux/Types'
import errorModal from 'Utils/errorModal'
import PermissionsContainer from 'Components/Permissions/Container'

type Props = {
  plan_module?: keyof ModulesType,
  permission?: keyof PermissionsType,
} & RouteProps

const PrivateRoute: React.FC<Props> = ({ plan_module, permission, ...props }) => {
  const location = useLocation()
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const { is_authenticated, loading, account_verified, company, trial_rest_days, has_open_payments } = useUserSelector(state => state)
  const toHire = company?.toHire ?? true
  const trial = company?.trial ?? true

  useEffect(() => {
    if (is_authenticated) updatesTokenExpiration()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!is_authenticated) return <Navigate to="/login"/>
  if (loading || (!account_verified && props.path !== '/active-account')) return null
  if (!toHire && !(trial && trial_rest_days > 0) && !location.pathname.includes('/plans')) {
    errorModal({ content: 'Seu período de teste já chegou ao fim! Escolha um plano e contrate nossa solução!' }, 3000)
    return <Navigate to="/plans"/>
  }
  if (has_open_payments && props.path !== '/billing') return null

  return (
    <Route
      {...props}
      element={
        // @ts-ignore
        <PermissionsContainer has_module={plan_modules?.[plan_module]} has_permission={permissions?.[permission]?.read}>
          {props.element}
        </PermissionsContainer>
      }
    />
  )
}

export default memo(PrivateRoute)
