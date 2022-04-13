import React from 'react'
import { InputNumber } from 'antd'
import { currencyFormatter, currencyParser } from 'Utils/formatters'
import { InputNumberProps } from 'antd/lib/input-number'

const CurrencyInput: React.FC<InputNumberProps> = (props) => {
  return (
    <InputNumber
      style={{ width: '100%' }}
      min={0}
      formatter={(value) => value ? currencyFormatter(value, { cents: true }) : 'R$ 0,00'}
      parser={(value) => value ? currencyParser(value) : 0}
      {...props}
    />
  )
}

export default CurrencyInput
