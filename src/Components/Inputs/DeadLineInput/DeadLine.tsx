import React from 'react'
import { Select } from 'antd'
import useGetDeadLine, { DeadLineType } from './useGetDeadLine'
import { SelectProps } from 'antd/lib/select'

type Props = {
  onUserChange?: (value: string, user?: any) => void,
  value_key?: keyof DeadLineType,
} & SelectProps<string>

const DeadLineInput: React.FC<Props> = ({ onUserChange, value_key = '_id', ...props }) => {
  const [{ data: query_data, loading }] = useGetDeadLine()
  const data = query_data?.message || []

  return (
    <Select
      style={{ width: '100%' }}
      loading={loading}
      placeholder="Tipo de Prazo"
      getPopupContainer={trigger => trigger.parentElement}
      {...props}
    >
      {data.map(deadline => (
        <Select.Option key={deadline._id} value={deadline[value_key]} description={deadline.description}>
          {deadline.description}
        </Select.Option>
      ))}
    </Select>
  )
}

export default DeadLineInput
