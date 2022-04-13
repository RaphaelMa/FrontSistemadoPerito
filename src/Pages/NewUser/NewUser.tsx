import React, { useEffect, useRef, useState } from 'react'
import { Form, Row, Col, Space, Button, message } from 'antd'
import { useNavigate, useParams } from 'react-router'
import { Store } from 'antd/lib/form/interface'
import AditionalUserModal, { AditionalUserModalRefType } from './AditionalUserModal'
import UserForm from './UserForm'
import PermissionsForm from './PermissionsForm'
import styled from 'styled-components'
import moment from 'moment'
import messageError from 'Utils/messageError'
import successModal from 'Utils/successModal'
import useSaveUser from './useSaveUser'
import useGetUser from './useGetUser'
import { useUserSelector } from 'Redux/UserReducer'
import PermissionsContainer from 'Components/Permissions/Container'

const NewUser: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)
  const kindUser = useUserSelector(state => state.kindUser)

  const aditionalUserModalRef = useRef<AditionalUserModalRefType>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [saveUser, { loading }] = useSaveUser()
  const [getUser, { loading: user_loading }] = useGetUser()

  const DATE_FIELDS = [
    'birthday',
    'createAt'
  ]

  // Se não tem permissão para ver tbm não pode acessar, verificação feita no routes.ts
  const has_permission = (!!id && permissions?.user.update) || (!id && permissions?.user.create)

  const loadUser = async (user_id: string) => {
    try {
      const { data }  = await getUser(user_id)

      Object.entries(data).forEach(([key, value]) => {
        if (DATE_FIELDS.includes(key) && value) {
          // @ts-ignore
          data[key] = moment(value, 'YYYY-MM-DD')
        }
      })

      const user_values = {
        ...data,
        kindUser_id: data.kindUser?.kindUser_id,
        professional_id: data.professional?.professional_id
      }
      form.setFieldsValue(user_values)
    } catch (error) {
      messageError('202010311510')
      console.log(error)
    }
  }

  useEffect(() => {
    if (id && has_permission) loadUser(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const addAditionalUser = async () => {
    try {
      aditionalUserModalRef.current?.close()
      const values = await form.validateFields()
      handleFormFinish({ ...values, additionalUser: true })
    } catch (error) {
      console.log('[NewUser] ', error)
    }
  }

  const normalizeValues = (values: Store) => {
    Object.entries(values).forEach(([key, value]) => {
      if (DATE_FIELDS.includes(key) && value) {
        values[key] = value.format('YYYY-MM-DD')
      }
    })

    return values
  }

  const handleFormFinish = async (raw_values: Store) => {
    const values = normalizeValues(raw_values)

    try {
      const response = await saveUser(values as any)

      if (response.data.success) {
        successModal({ content: 'Usuário salvo com sucesso' })
        setTimeout(() => {
          navigate('/users')
        }, 1500)
        return
      }

      message.error(response.data.message)
    } catch (error) {
      console.log('[NewUser] ', error.response)
      const { key } = error.response.data
      if (key === 'aditional_user') {
        aditionalUserModalRef.current?.open()
        return
      }

      messageError('2020102046')
      console.log('[NewUser] ', error)
    }
  }

  return (
    <PermissionsContainer has_permission={has_permission}>
      <Container>
        <Form form={form} layout="vertical" style={{ width: '100%' }} onFinish={handleFormFinish}>

          {kindUser?.kindUser_key === 'admin'  ? (
            <Row gutter={40}>
                <Col span={12}>
                  <UserForm id={id} isAdmin={true}/>
                </Col>
                <Col span={12}>
                  <PermissionsForm/>
                </Col>
            </Row>
          ) : (
            <UserForm id={id}/>
          )}
          <Footer justify="end">
            <Space>
              <Button onClick={() => navigate('/users')}>Cancelar</Button>
              <Button
                disabled={loading || user_loading}
                loading={loading || user_loading}
                type="primary"
                htmlType="submit"
              >
                Salvar
              </Button>
            </Space>
          </Footer>
        </Form>
        <AditionalUserModal onAccept={addAditionalUser} ref={aditionalUserModalRef}/>
      </Container>
    </PermissionsContainer>
  )
}

export default NewUser

const Container = styled(Row)`
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px 40px 0 40px;
  height: calc(100% - 5rem);
`

const Footer = styled(Row)`
  width: 100%;
  position: sticky;
  bottom: 43px;
  background: white;
  padding: 8px 0;
`
