import React from 'react'
import { Select,  } from 'antd'
import { SelectProps } from 'antd/lib/select'
import useGetProfessional from './useGetProfessional'

type Props = SelectProps<string>

const ProfessionalInput: React.FC<Partial<Props>> = (props) => {
  const [{ loading, data }] = useGetProfessional()

  return (
    <Select
      loading={loading}
      style={{ width: '100%' }}
      placeholder="Selecione"
      {...props}
    >
      {data?.map(professional => (
        <Select.Option key={professional._id} value={professional._id}>{professional.description}</Select.Option>
      ))}
    </Select>
  )
}

export default ProfessionalInput
