import React, { useEffect } from 'react'
import { Select } from 'antd'
import { deburr } from 'lodash'
import { SelectProps } from 'antd/lib/select'
import useGetColumns from './useGetColumns'

const TaskColumnInput: React.FC<SelectProps<any | any[]>> = (props) => {
  const [{ data, loading }, getColumns] = useGetColumns()

  useEffect(() => {
    getColumns()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Coluna"
        showSearch
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.name).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        {...props}
      >
        {data?.map(column => (
          <Select.Option key={column._id} value={column._id} description={column.description}>
            {column.description}
          </Select.Option>
        ))}
      </Select>
  )
}

export default TaskColumnInput
