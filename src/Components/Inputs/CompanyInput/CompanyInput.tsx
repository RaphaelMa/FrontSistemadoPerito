import React from 'react'
import { Select,  } from 'antd'
import { SelectProps } from 'antd/lib/select'
import useGetCompanies from './useGetCompanies'
import { deburr } from 'lodash'
import { Options } from 'axios-hooks'

type Props = {
  query_options?: Options
} & SelectProps<string>

const CompanyInput: React.FC<Partial<Props>> = ({query_options, ...props}) => {
  const [{ loading, data }] = useGetCompanies(query_options)

  return (
    <Select
      loading={loading}
      style={{ width: '100%' }}
      placeholder="Selecione"
      filterOption={(raw_value, option) => {
        const value = deburr(raw_value).toLowerCase()
        const option_value = deburr(option?.children).toLowerCase()

        return option_value.indexOf(value) >= 0
      }}
      {...props}
    >
      {data?.map(company => (
        <Select.Option key={company._id} value={company._id}>{company.description}</Select.Option>
      ))}
    </Select>
  )
}

export default CompanyInput
