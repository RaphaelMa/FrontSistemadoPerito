import React from 'react'
import { Form, Input } from 'antd'
import { FormInstance } from 'antd/lib/form'

type Props = {
  form: FormInstance
}

const ProcessSituationForm: React.FC<Props> = ({ form }) => {

  return (
    <Form layout="vertical" form={form}>
      <Form.Item noStyle name="_id">
        <Input type="hidden"/>
      </Form.Item>
      <Form.Item required name="description" label="Descrição">
        <Input/>
      </Form.Item>
    </Form>
  )
}

export default ProcessSituationForm
