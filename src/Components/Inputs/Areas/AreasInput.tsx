import React from 'react'
import { Select,  } from 'antd'
import { SelectProps } from 'antd/lib/select'
import useGetAreas from './useGetAreas'

type Props = SelectProps<string>

const AreasInput: React.FC<Partial<Props>> = (props) => {
  const [{ loading: area_loading, data }] = useGetAreas()

  return (
    <Select
      loading={area_loading}
      style={{ width: '100%' }}
      placeholder="Área de atuação"
      {...props}
    >
      {data?.map(area => (
        <Select.Option key={area._id} value={area._id}>{area.description}</Select.Option>
      ))}
    </Select>
  )
}

export default AreasInput
