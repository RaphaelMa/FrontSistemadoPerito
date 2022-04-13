import React, { memo } from 'react'
import Card from 'Pages/NewProcess/Card'
import { Col, Divider, Form, Input, Row } from 'antd'

type Props = {
  title: string,
  field_name: string,
}

const PeopleCard: React.FC<Props> = ({ title, field_name }) => (
  <Card>
    <Divider orientation="left">{title}</Divider>

    <Form.List name={field_name}>
      {(fields) => (
        <div>
          {fields.map(field => (
            <Row key={field.fieldKey} gutter={8}>
              <Col span={8}>
                <Form.Item
                  {...field}
                  name={[field.name, 'kindPeople', 'kindPeople_description']}
                  fieldKey={[field.fieldKey, 'kindPeopleId']}
                >
                  <Input/>
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item
                  {...field}
                  name={[field.name, 'people', 'people_name']}
                  fieldKey={[field.fieldKey, 'peopleId']}
                >
                  <Input/>
                </Form.Item>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </Form.List>
  </Card>
)

export default memo(PeopleCard)
