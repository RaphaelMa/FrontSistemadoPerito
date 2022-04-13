import React from 'react'
import { Select } from 'antd'
import { deburr } from 'lodash'
import useGetProcesses from './useGetProcesses'
import { SelectProps } from 'antd/lib/select'

type Props = {
  onProcessChange?: (id: string, process: any) => void
} & SelectProps<string>

// TODO: Ajustar props
const ProcessInput: React.FC<Props> = ({ onProcessChange, ...props }) => {
  const [{ data, loading }] = useGetProcesses()
  const processes = data || []

  return (
    <Select
      style={{ width: '100%' }}
      loading={loading}
      placeholder="Processo"
      getPopupContainer={trigger => trigger.parentElement}
      showSearch
      filterOption={(raw_value, option) => {
        const value = deburr(raw_value).toLowerCase()
        const option_value = deburr(option?.children).toLowerCase()

        return option_value.indexOf(value) >= 0
      }}
      {...props}
      onChange={(value, options) => {
        onProcessChange?.(value, processes.find(process => process._id === value))
        props.onChange?.(value, options)
      }}
    >
      {processes.map(process => (
        <Select.Option key={process._id} value={process._id} number={process.processNumber}>
          {process.processNumber}
        </Select.Option>
      ))}
    </Select>
  )
}

export default ProcessInput
