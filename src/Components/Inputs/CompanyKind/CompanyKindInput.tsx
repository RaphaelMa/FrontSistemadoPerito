import React from 'react'
import { Select,  } from 'antd'
import { SelectProps } from 'antd/lib/select'
import useGetCompanyKinds from './useGetCompanyKinds'

type Props = SelectProps<string>

const CompanyKindInput: React.FC<Partial<Props>> = (props) => {
  const [{ loading, data }] = useGetCompanyKinds()

  return (
    <Select
      loading={loading}
      style={{ width: '100%' }}
      placeholder="Selecione"
      {...props}
    >
      {data?.map(kind => (
        <Select.Option key={kind._id} value={kind._id}>{kind.description}</Select.Option>
      ))}
    </Select>
  )
}

export default CompanyKindInput
