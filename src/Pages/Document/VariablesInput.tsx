import { Select } from 'antd'
import React from 'react'
import useGetVariables from './useGetVariables'

type Props = {
  type: 'people' | 'process',
  addVariable: (variable: string) => void,
}

const VariablesInput: React.FC<Props> = ({ type, addVariable }) => {
  const [{ data }] =  useGetVariables(type)

  const options = data || []

  return (
    <Select<string>
      //@ts-ignore
      value={null}
      style={{ width: '100%' }}
      placeholder={type === 'people' ? 'Variáveis Nome' : 'Variáveis Processo'}
      onChange={(value) => addVariable(value)}
    >
      {options.map(option => (
        <Select.Option key={option.key} value={option.key}>
          {option.description}
        </Select.Option>
      ))}
    </Select>
  )
}

export default VariablesInput
