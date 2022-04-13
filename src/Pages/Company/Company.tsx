import React, { useEffect } from 'react'
import { Form, Row, Space, Button, Modal, message } from 'antd'
import { useUserSelector, useUserDispatch } from 'Redux/UserReducer'
import { updateCompanyData } from 'Redux/fetchActions'
import { Store } from 'antd/lib/form/interface'
import styled from 'styled-components'
import CompanyForm from './CompanyForm'
import messageError from 'Utils/messageError'
import successModal from 'Utils/successModal'
import useSaveCompany from './useSaveCompany'
import PlanInformation from './PlanInformation'

const Company: React.FC = () => {
  const company = useUserSelector(state => state.company)
  const permissions = useUserSelector(state => state.permissions)

  const [form] = Form.useForm()
  const { setFieldsValue } = form
  const [saveCompany, { loading }] = useSaveCompany()
  const dispatch = useUserDispatch()
  const { active } = company || {}

  useEffect(() => {
    // Faz o refetch dos dados quando entra, só para manter os dados sempre atualizados
    // TODO: Buscar somente os dados da empresa
    updateCompanyData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    form.setFieldsValue({ ...company, plan_id: company?.plan.plan_id })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company])


  const handleFormFinish = async (values: Store) => {
    try {
      const response = await saveCompany(values as any)

      if (response.data.success) {
        successModal({ content: 'Empresa salva com sucesso' })
        dispatch({ type: 'UPDATE_COMPANY', payload: response.data.company })
        return
      }

      message.error(response.data.message)
    } catch (error) {
      messageError('202010312007')
      console.log('[Company] ', error)
    }
  }

  const confirmStatusChange = (active_company: boolean) => {
    Modal.confirm({
      title: (
        <span>
          A conta será {active_company ? 'ativada' : 'desativada'}!<br/>
          Deseja continuar?
        </span>
      ),
      okText: 'Sim',
      onOk: () => changeCompanyStatus(active_company),
    })
  }

  const changeCompanyStatus = async (active_company: boolean) => {
    const form_values: any = await form.validateFields()

    try {
      const response = await saveCompany({ ...form_values, active: active_company })

      if (response.data.success) {
        successModal({ content: `Empresa ${active_company ? 'ativado' : 'desativado'} com sucesso` })
        dispatch({ type: 'UPDATE_COMPANY', payload: response.data.company })
        return
      }

      message.error(response.data.message)
    } catch (error) {
      messageError('202010312014')
      console.log('[Company] ', error)
    }
  }

  return (
    <Container>
      <Form form={form} layout="vertical" onFinish={handleFormFinish}>
        <FormContainer>
          <CompanyForm width={40} setFieldsValue={setFieldsValue}/>
          <PlanInformation/>
        </FormContainer>
        {permissions?.company.update && (
          <Footer justify="end">
            <Space>
              <Button
                disabled={loading}
                loading={loading}
                type="primary"
                htmlType="submit"
              >
                Salvar
              </Button>
              {active ? (
                <Button
                  disabled={loading}
                  loading={loading}
                  onClick={() => confirmStatusChange(false)}
                >
                  Desativar
                </Button>
              ) : (
                <Button
                  disabled={loading}
                  loading={loading}
                  onClick={() => confirmStatusChange(true)}
                >
                  Ativar
                </Button>
              )}
            </Space>
          </Footer>
        )}
      </Form>
    </Container>
  )
}

export default Company

const Container = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 40px;
  height: calc(100% - 5rem);
`

const FormContainer = styled.div`
  display: flex;
`

const Footer = styled(Row)`
  width: 100%;
  position: sticky;
  bottom: 0;
  background: white;
  padding: 8px 0;
`
