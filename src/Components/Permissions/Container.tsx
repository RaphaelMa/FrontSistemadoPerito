import React from 'react'
import ModulePage from './ModulePage'
import PermissionPage from './PermissionPage'

type Props = {
  has_permission?: boolean,
  has_module?: boolean,
  children: any
}

const Container: React.FC<Props> = ({ has_permission = true, has_module = true, children }) => {
  if (has_permission && has_module) return children

  if (!has_module) return <ModulePage/>

  return <PermissionPage/>
}

export default Container
