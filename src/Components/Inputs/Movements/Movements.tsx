import React from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { deburr } from 'lodash'
import useGetMovements from './useGetMovements'

type Props = SelectProps<any | any[]>

const CategoryInput: React.FC<Props> = (props) => {
  const [{ data, loading }] = useGetMovements()
  const movements = data || []

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Categoria"
        showSearch
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.children).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        dropdownRender={menu =>
          <div>
            {menu}
          </div>
        }
        {...props}
      >
        {movements.map(movement => (
          <Select.Option key={movement._id} value={movement._id}>{movement.description}</Select.Option>
        ))}
      </Select>
    </>
  )
}

export default CategoryInput
