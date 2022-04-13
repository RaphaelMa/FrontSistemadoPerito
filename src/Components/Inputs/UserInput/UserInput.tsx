import React from 'react'
import { Select } from 'antd'
import { deburr } from 'lodash'
import useGetUsers, { UsersType } from './useGetUsers'
import { SelectProps } from 'antd/lib/select'

type Props = {
  value_key?: keyof UsersType
} & SelectProps<string>

const UserInput: React.FC<Props> = ({ value_key = '_id', ...props }) => {
  const [{ data, loading }] = useGetUsers()
  const users = data || []

  return (
    <Select
      style={{ width: '100%' }}
      loading={loading}
      placeholder="Pessoa"
      showSearch
      getPopupContainer={trigger => trigger.parentElement}
      filterOption={(raw_value, option) => {
        const value = deburr(raw_value).toLowerCase()
        const option_value = deburr(option?.children).toLowerCase()

        return option_value.indexOf(value) >= 0
      }}
      {...props}
    >
      {users.map(user => (
        <Select.Option key={user._id} value={user[value_key]} name={user.name}>
          {user.name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default UserInput
