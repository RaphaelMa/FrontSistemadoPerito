import React from 'react'
import { Input } from 'antd'
// @ts-ignore
import InputMask, { ReactInputMaskProps }from 'react-input-mask'

const CpfInput: React.FC<Partial<ReactInputMaskProps>> = (props) => {
  return (
    <InputMask
      mask={'999.999.999-99'}
      maskChar={null}
      style={{ width: '100%' }}
      {...props}
    >
      {(input_props: any) => <Input min={11} {...input_props} autoComplete="off"/>}
    </InputMask>
  )
}

export default CpfInput
