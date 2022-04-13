import React from 'react'
import { Input } from 'antd'
// @ts-ignore
import InputMask, { ReactInputMaskProps }from 'react-input-mask'

const PhoneInput: React.FC<Partial<ReactInputMaskProps>> = (props) => {
  const mask = props.value && props.value.toString().length <= 10 ? '(99) 9999-99999' : '(99) 99999-9999'

  return (
    <InputMask
      mask={mask}
      maskChar={null}
      style={{ width: '100%' }}
      {...props}
    >
      {(input_props: any) => <Input min={10} {...input_props} placeholder={mask} autoComplete="off"/>}
    </InputMask>
  )
}

export default PhoneInput
