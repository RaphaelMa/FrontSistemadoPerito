import React from 'react'
import { Select,  } from 'antd'
import { SelectProps } from 'antd/lib/select'
import useGetUserKinds from './useGetUserKinds'

type Props = SelectProps<string>

const UserKindInput: React.FC<Partial<Props>> = (props) => {
  const [{ data, loading }] = useGetUserKinds()

  return (
    <Select
      loading={loading}
      style={{ width: '100%' }}
      placeholder="Selecione"
      getPopupContainer={trigger => trigger.parentElement}
      {...props}
    >
      {data?.map(kind => (
        <Select.Option key={kind._id} value={kind._id}>{kind.description}</Select.Option>
      ))}
    </Select>
  )
}

export default UserKindInput
