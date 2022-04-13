import React from 'react'
import { Card, Divider, Switch, Form } from 'antd'
import styled from 'styled-components'

const PERMISSIONS_DESCRIPTION = {
  attachment: 'Arquivos',
  billing: 'Pagamentos',
  company: 'Empresa',
  dashboard: 'Dashboard',
  document: 'Documentos',
  financial: 'Financeiro',
  historic: 'Histórico',
  judicialdistrict: 'Comarca',
  keyWord: 'Palavra chave',
  kindPeople: 'Tipo de pessoa',
  notification: 'Notificações',
  people: 'Pessoas',
  peoplemanagement: '',
  plan: 'Plano',
  process: 'Processos',
  processFinancialSituation: 'Situação financeira do processo',
  processNature: 'Natureza do processo',
  processSituation: 'Situação do processo',
  report: 'Relatórios',
  schedule: 'Agenda',
  task: 'Tarefas',
  taskAutomation: 'Automações de tarefas',
  user: 'Usuários',
}

const PERMISSIONS_KEYS = {
  attachment: ['create', 'read', 'delete'],
  billing: ['read'],
  company: ['read', 'update'],
  dashboard: ['read'],
  document: ['create', 'read', 'update', 'delete'],
  financial: ['create', 'read', 'update', 'delete'],
  historic: ['read'],
  judicialdistrict: ['create', 'read', 'update', 'delete'],
  keyWord: ['create', 'read', 'update', 'delete'],
  kindPeople: ['create', 'read', 'update', 'delete'],
  notification: ['read', 'update'],
  people: ['create', 'read', 'update', 'delete'],
  peoplemanagement: ['read'],
  plan: ['read', 'update'],
  process: ['create', 'read', 'update', 'delete', 'accessAll'],
  processFinancialSituation: ['create', 'read', 'update', 'delete'],
  processNature: ['create', 'read', 'update', 'delete'],
  processSituation: ['create', 'read', 'update', 'delete'],
  report: ['read'],
  schedule: ['read', 'update'],
  task: ['create', 'read', 'update', 'delete'],
  taskAutomation: ['create', 'read', 'update', 'delete'],
  user: ['create', 'read', 'update', 'delete'],
}

const PermissionsForm: React.FC = () => {
  const optionRender = (option: string, name: string[]) => {
    const key = name.join('.')

    if (option.includes('accessAll')) {
      return (
        <Form.Item key={key} name={name} label="Acessar Todos" valuePropName="checked" style={{alignItems: 'center'}}>
          <Switch />
        </Form.Item>
      )
    }

    if (option.includes('read')) {
      return (
        <Form.Item key={key} name={name} label="Acessar" valuePropName="checked">
          <Switch />
        </Form.Item>
      )
    }

    if (option.includes('create')) {
      return (
        <Form.Item key={key} name={name} label="Criar" valuePropName="checked">
          <Switch />
        </Form.Item>
      )
    }

    if (option.includes('update')) {
      return (
        <Form.Item key={key} name={name} label="Editar" valuePropName="checked">
          <Switch />
        </Form.Item>
      )
    }

    if (option.includes('delete')) {
      return (
        <Form.Item key={key} name={name} label="Excluir" valuePropName="checked" >
          <Switch />
        </Form.Item>
      )
    }

    

    return null
  }

  return (
    <StyledCard>
      <Divider orientation="left" style={{ marginBottom: 40 }}>
        Permissões de acesso
      </Divider>

      {Object.keys(PERMISSIONS_DESCRIPTION).map(permission_key => {
        // @ts-ignore
        const description = PERMISSIONS_DESCRIPTION[permission_key]
        // @ts-ignore
        const permission_keys: string[] = PERMISSIONS_KEYS[permission_key]

        if (!description || !permission_keys) return null

        return (
          <Row key={permission_key}>
            <div>
              {description}
            </div>

            <Options>
              {permission_keys.map(key => optionRender(key, ['acecessPermission', permission_key, key]))}
            </Options>
          </Row>
        )
      })}
    </StyledCard>
  )
}

export default PermissionsForm

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  margin-bottom: 20px;

  .ant-divider.ant-divider-horizontal {
    margin-top: 0;
  }

  .ant-card-body {
    height: 100%;
  }
`

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;
  justify-content: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & > div {
    margin-left: 10px;
  }
`
