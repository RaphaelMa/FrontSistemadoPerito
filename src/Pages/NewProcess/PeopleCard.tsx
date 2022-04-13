import React from 'react'
import { Form, Divider, Row, Col, Button } from 'antd'
import Card from './Card'
import { DeleteOutlined } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import { AllDataType as PersonDataType } from 'Components/Inputs/PersonInput/PersonInput'
import PersonInput from 'Components/Inputs/PersonInput/PersonInput'
import PersonKindInput from 'Components/Inputs/PersonKindInput/PersonKindInput'

type Props = {
  title: string,
  field_name: 'responsibles' | 'peoples' | 'activePole' | 'passivePole',
  options?: PersonDataType[],
  refetch: () => void,
  loading: boolean,
}

const PeopleCard: React.FC<Props> = ({ title, field_name, options, refetch, loading }) => (
  <Card>
    <Divider orientation="left">{title}</Divider>
    <Form.List name={field_name}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field) => (
              <Row key={field.fieldKey} gutter={8}>
                <Form.Item
                  noStyle
                  shouldUpdate={(prev_values, cur_values) => {
                    const prev_kind = prev_values[field_name][field.fieldKey]?.kindPeopleId
                    const cur_kind = cur_values[field_name][field.fieldKey]?.kindPeopleId
                    const prev_people = prev_values[field_name][field.fieldKey]?.peopleId
                    const cur_people = cur_values[field_name][field.fieldKey]?.peopleId

                    return prev_kind !== cur_kind || prev_people !== cur_people
                  }}
                >
                  {({ getFieldValue }) => {
                    const has_kind_people = !!getFieldValue([field_name, field.fieldKey, 'kindPeopleId'])
                    const has_people = !!getFieldValue([field_name, field.fieldKey, 'peopleId'])

                    return (
                      <>
                        <Col span={8}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'kindPeopleId']}
                            fieldKey={[field.fieldKey, 'kindPeopleId']}
                            rules={[{ required: has_people, message: 'Campo obrigatório' }]}
                          >
                            <PersonKindInput show_create_button/>
                          </Form.Item>
                        </Col>

                        <Col span={14}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'peopleId']}
                            fieldKey={[field.fieldKey, 'peopleId']}
                            rules={[{ required: has_kind_people, message: 'Campo obrigatório' }]}
                          >
                            <PersonInput
                              with_users={true}
                              show_create_button
                              person_options={options}
                              fetch_options={false}
                              refetch={refetch}
                              external_loading={loading}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    )
                  }}
                </Form.Item>

                <Col span={2}>
                  <DeleteOutlined
                    style={{ marginTop: '8px', color: theme.colors.red }}
                    onClick={() => remove(field.name)}
                  />
                </Col>
              </Row>
            ))}
            <Button type="primary" onClick={() => add()}>Nova Pessoa</Button>
          </div>
        )
      }}
    </Form.List>
  </Card>
)

export default PeopleCard
