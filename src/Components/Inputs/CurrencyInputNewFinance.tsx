import React from 'react'
import { InputNumber } from 'antd'
import { currencyParser } from 'Utils/formatters'
import { InputNumberProps } from 'antd/lib/input-number'

const CurrencyInputNewFinance: React.FC<InputNumberProps> = (props) => {
  return (
    <InputNumber
      style={{ width: '100%' }}
      min={0}
      parser={(value) => value ? currencyParser(value) : 0}
      {...props}
    />
  )
}

export default CurrencyInputNewFinance
