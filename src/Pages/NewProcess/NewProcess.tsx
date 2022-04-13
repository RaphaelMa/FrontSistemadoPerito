import React from 'react'
import MenuTop from './MenuTop'
import ProcessForm from './ProcessForm'
import { useParams } from 'react-router-dom'
import { useUserSelector } from 'Redux/UserReducer'
import PermissionsContainer from 'Components/Permissions/Container'
import Container from './Components/Container'

const NewProcess: React.FC = () => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const { id } = useParams()

  // Se não tem permissão para ver tbm não pode acessar, verificação feita no routes.ts
  const has_permissions = (!!id && permissions?.plan.update) || (!id && permissions?.process.create)

  return (
    <PermissionsContainer has_module={plan_modules?.Process} has_permission={has_permissions}>
      <Container>
        <MenuTop id={id}/>
        <ProcessForm id={id}/>
      </Container>
    </PermissionsContainer>
  )
}

export default NewProcess
