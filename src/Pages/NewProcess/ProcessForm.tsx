import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Form, Row, Col, Input, Button, Space, Spin, message } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { useNavigate } from 'react-router'
import PeopleCard from './PeopleCard'
import ResponsiblesCard from './ResponsiblesCard'
import ProcessDataCard from './ProcessDataCard'
import ExpertiseCard from './ExpertiseCard'
import ExtraCard from './ExtraCard/ExtraCard'
import styled from 'styled-components'
import useSaveProcess from './useSaveProcess'
import messageError from 'Utils/messageError'
import successModal from 'Utils/successModal'
import useGetPrevisionDate from './useGetPrevisionDate'
import FilesCard from './Files/FilesCard'
import useGetProcess, { ProcessType } from './useGetProcess'
import moment from 'moment'
import useGetPeople from 'Components/Inputs/PersonInput/useGetPeople'
import useGetUsers from 'Components/Inputs/PersonInput/useGetUsers'
import CompanyInput from 'Components/Inputs/CompanyInput/CompanyInput'
import ImportButton from './ImportButton'
import { useUserSelector } from 'Redux/UserReducer'
import { AllDataType as PersonDataType } from 'Components/Inputs/PersonInput/PersonInput'
import AdditionalPushModal, { AdditionalPushModalRefType } from './AdditionalPushModal/AdditionalPushModal'

let prevision_date_count: number = 0

const DATE_FIELDS = [
  'appointmentDate',
  'expertiseDate',
  'previsionReport',
  'deliveryReport',
  'clarificationReport',
  'clarificationDeliveryReport',
  'dateImpugnment',
  'previsionImpugnment',
  'deliveryImpugnment',
  'clarificationImpugnment',
  'clarificationDeliveryImpugnment',
  'createAt'
]

type Props = {
  id?: string,
}

const ProcessForm: React.FC<Props> = ({ id }) => {
  const [import_key, setImportKey] = useState<ProcessType['statusImport_key'] | undefined>()
  const [push_description, setPushDescription] = useState<string | undefined>()

  const additionalPushModalRef = useRef<AdditionalPushModalRefType>(null)

  const [{ data: people = [], loading: people_loading }, getPeople] = useGetPeople()
  const [{ data: users = [], loading: users_loading }, getUsers] = useGetUsers()
  const [saveProcess, { loading: save_loading }] = useSaveProcess()
  const [{ data, loading }, getProcess] = useGetProcess()
  // TODO: Colocar no campo de datas para ficar mais facil de fazer a lógica
  const [, getPrevisionDate] = useGetPrevisionDate()

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const plan_modules = useUserSelector(state => state.company?.plan.modules)

  const setFormValues = (process: ProcessType) => {
    Object.entries(process).forEach(([key, value]) => {
      if (DATE_FIELDS.includes(key) && value) {
        // @ts-ignore
        process[key] = moment(value, 'YYYY-MM-DD')
      }
    })

    const values = {
      ...process,
      peoples: formatPeopleValuesToForm(process.peoples || []),
      activePole: formatPeopleValuesToForm(process.activePole || []),
      passivePole: formatPeopleValuesToForm(process.passivePole || []),
      responsibles: formatPeopleValuesToForm(process.responsibles || []),
      annotation: process.annotation?.map(annotation => ({ ...annotation, key: annotation._id })),
      acceptAppointment: process.acceptAppointment === undefined || process.acceptAppointment === null ? undefined
        : process.acceptAppointment ? 'true' : 'false',
      freeJustice: process.freeJustice === undefined || process.freeJustice === null ? undefined : process.freeJustice
        ? 'true' : 'false',
      favorite: process.favorite === undefined || process.favorite === null ? undefined : process.favorite
        ? 'true' : 'false'
    }

    delete values['movements']
    form.setFieldsValue(values)
  }

  const loadProcess = async () => {
    if (!id) return

    try {
      const response = await getProcess(id)
      const process = response.data
      setImportKey(process.statusImport_key)
      setPushDescription(process.push?.push_description)

      setFormValues(process)
    } catch (error) {
      messageError('20200022127')
      console.log(error)
    }
  }

  useEffect(() => {
    loadProcess()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatPeopleValuesToForm = (people: any[]) => {
    const new_peoples: any[] = []

    people?.forEach(person => {
      new_peoples.push({
        kindPeopleId: person.kindPeople.kindPeople_id,
        peopleId: person.people.people_id
      })
    })

    return new_peoples
  }

  const normalizeValues = (values: Store) => {
    Object.entries(values).forEach(([key, value]) => {
      if (DATE_FIELDS.includes(key) && value) {
        values[key] = value.format('YYYY-MM-DD')
      }
    })

    return {
      ...values,
      annotation: values.annotation ? JSON.stringify(values.annotation) : undefined,
      peoples: formatPeopleValues(values.peoples),
      activePole: formatPeopleValues(values.activePole),
      passivePole: formatPeopleValues(values.passivePole),
      responsibles: formatPeopleValues(values.responsibles),
      acceptAppointment: values.acceptAppointment === undefined ? undefined : values.acceptAppointment === 'true',
      freeJustice: values.freeJustice === undefined ? undefined : values.freeJustice === 'true'
    }
  }

  const formatPeopleValues = (people: any[]) => {
    const new_peoples: any[] = []

    people?.forEach(person => {
      if (!person.kindPeopleId || !person.peopleId) return

      new_peoples.push({
        kindPeople: { kindPeople_id: person.kindPeopleId }, people: { people_id: person.peopleId }
      })
    })

    return JSON.stringify(new_peoples)
  }

  const handleFormFinish = async (raw_values: Store) => {
    const values = normalizeValues(raw_values)

    try {
      // TODO: melhorar a tipagem
      const response = await saveProcess(values as any)
      console.log('RESPONSE SAVE PROCESS =>', response);

      if (response.data.success) {
        successModal({ content: 'Processo salvo com sucesso' })
        setTimeout(() => {
          navigate('/process-list')
        }, 1500)
        return
      }

      if (response.data.key === 'aditional_push') {
        additionalPushModalRef.current?.open()
        return
      }

      message.error(response.data.message)
    } catch (error) {
      messageError('202008310110')
      console.log('[ProcessForm] ', error)
    }
  }

  const importProcess = async () => {
    try {
      const values = await form.validateFields()
      handleFormFinish({ ...values, statusProcessMonitoring: true })
    } catch (e) { /** Ignora o erro */
    }
  }

  // TODO: refatorar este código maravilhoso
  const previsionDate = (changed_values: Store, all_values: Store) => {
    const key = Object.keys(changed_values)[0]

    if (['expertiseDate', 'reportDays', 'typeReportDays'].includes(key) && all_values.expertiseDate && all_values.reportDays && all_values.typeReportDays !== undefined) {
      clearTimeout(prevision_date_count)
      prevision_date_count = setTimeout(async () => {
        const response = await getPrevisionDate({
          data: {
            typeDocument: 'report',
            expertiseDate: all_values.expertiseDate.format('YYYY-MM-DD'),
            reportDays: all_values.reportDays,
            typeReportDays: all_values.typeReportDays
          }
        })
        if (response.data.success) {
          form.setFieldsValue({ 'previsionReport': moment(response.data.previsionReport, 'YYYY-MM-DD') })
        }
      }, 800)
      return
    }

    if (['dateImpugnment', 'impugnmentDays', 'typeImpugnmentDays'].includes(key) && all_values.dateImpugnment && all_values.impugnmentDays && all_values.typeImpugnmentDays !== undefined) {
      clearTimeout(prevision_date_count)
      prevision_date_count = setTimeout(async () => {
        const response = await getPrevisionDate({
          data: {
            typeDocument: 'impugnment',
            dateImpugnment: all_values.dateImpugnment.format('YYYY-MM-DD'),
            impugnmentDays: all_values.impugnmentDays,
            typeImpugnmentDays: all_values.typeImpugnmentDays
          }
        })
        if (response.data.success) {
          form.setFieldsValue({ 'previsionImpugnment': moment(response.data.previsionImpugnment, 'YYYY-MM-DD') })
        }
      }, 800)
    }
  }

  const fecthPersonData = useCallback(() => {
    getPeople()
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fecthPersonData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addAdditionalPush = async () => {
    try {
      additionalPushModalRef.current?.close()
      const values = await form.validateFields()
      handleFormFinish({ ...values, additionalPush: true, statusProcessMonitoring: true })
    } catch (error) {
      console.log('[NewProcess] ', error)
    }
  }

  const all_person_data: PersonDataType[] = []
  const all_users_data: PersonDataType[] = []
  people.forEach(person => all_person_data.push({ ...person, type: 'people' }))
  users.forEach(user => {
    all_users_data.push({ ...user, type: 'user' })
    all_person_data.push({ ...user, type: 'user' })
  })

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        peoples: [{}],
        activePole: [{}],
        passivePole: [{}],
        statusProcessMonitoring: false
      }}
      onFinish={handleFormFinish}
      onValuesChange={previsionDate}
    >
      <Spin spinning={loading || save_loading}>
        <Row gutter={40}>
          <Col span={10}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item name="_id" noStyle>
                  <Input type="hidden"/>
                </Form.Item>
                <Form.Item name="statusImport_key" noStyle>
                  <Input type="hidden"/>
                </Form.Item>

                <Form.Item
                  name="processNumber"
                  rules={[
                    { required: true, message: 'Campo obrigatório' }
                  ]}
                >
                  <Input autoFocus placeholder="Informe o número do processo"/>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="internalCode">
                  <Input placeholder="Controle Interno"/>
                </Form.Item>
              </Col>

              {plan_modules?.Multicompany && (
                <Col span={12}>
                  <Form.Item name="multicompany_id">
                    <CompanyInput allowClear showSearch placeholder="Empresa"/>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Row gutter={40} style={{ marginBottom: 24 }}>
          <Col span={10}>
            <ImportButton
              loading={save_loading}
              disabled={loading || save_loading}
              import_key={import_key}
              description={push_description}
              importProcess={importProcess}
            />
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={10}>
            <Row gutter={8}>
              <Col span={24}>
                <PeopleCard
                  title="Peritos e assistentes"
                  field_name="responsibles"
                  options={all_users_data}
                  refetch={fecthPersonData}
                  loading={users_loading}
                />
              </Col>
              
              <Col span={24}>
                <PeopleCard
                  title="Polo Ativo"
                  field_name="activePole"
                  options={all_person_data}
                  refetch={fecthPersonData}
                  loading={people_loading || users_loading}
                />
              </Col>
              <Col span={24}>
                <PeopleCard
                  title="Polo Passivo"
                  field_name="passivePole"
                  options={all_person_data}
                  refetch={fecthPersonData}
                  loading={people_loading || users_loading}
                />
              </Col>
              <Col span={24}>
                <PeopleCard
                  title="Pessoas"
                  field_name="peoples"
                  options={all_person_data}
                  refetch={fecthPersonData}
                  loading={people_loading || users_loading}
                />
              </Col>
              <Col span={24}>
                <Form.Item
                  noStyle
                  shouldUpdate={(prev, next) => prev._id !== next._id}
                >
                  {({ getFieldValue }) => {
                    const process_id = getFieldValue('_id')

                    return <FilesCard process_id={process_id}/>
                  }}
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            <Row gutter={8}>
              <Col span={24}>
                <ProcessDataCard setFieldsValue={form.setFieldsValue}/>
              </Col>
              <Col span={24}>
                <ExpertiseCard/>
              </Col>
              <Col span={24}>
                <ExtraCard movements={data?.movements || []}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>

      <Footer justify="end">
        <Space>
          <Button onClick={() => navigate('/process-list')}>Cancelar</Button>

          <Button
            disabled={loading || save_loading}
            loading={save_loading}
            type="primary"
            htmlType="submit"
          >
            Salvar
          </Button>
        </Space>
      </Footer>

      <AdditionalPushModal onAccept={addAdditionalPush} ref={additionalPushModalRef}/>
    </Form>
  )
}

export default ProcessForm

const Footer = styled(Row)`
  width: 100%;
  position: absolute;
  bottom: -20px;
  background: white;
  padding: 8px 0;
  padding-right: 5%;
  margin-bottom: 20px;
`
