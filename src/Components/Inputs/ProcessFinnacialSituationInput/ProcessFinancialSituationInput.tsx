import React, { useRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { PlusOutlined } from '@ant-design/icons'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { deburr } from 'lodash'
import useGetProcessFinancialSituations from './useGetProcessFinancialSituations'
import ProcessFinancialSituationDrawer, { ProcessFinancialSituationDrawerRefType } from 'Components/Drawers/ProcessFinancialSituation/ProcessFinancialSituation'
import { ProcessFinancialSituationType } from 'Components/Drawers/ProcessFinancialSituation/types'
import { useUserSelector } from 'Redux/UserReducer'
import { Options } from 'axios-hooks'

type Props = {
  show_create_button?: boolean,
  query_options?: Options
} & SelectProps<any | any[]>

// TODO: Ajustar props
const ProcessFinancialSituationInput: React.FC<Props> = ({ show_create_button, query_options, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const processFinancialSituationDrawerRef = useRef<ProcessFinancialSituationDrawerRefType>(null)

  const [{ data, loading }, refetch] = useGetProcessFinancialSituations(query_options)
  const financial_situations = data || []

  const onCreateClick = () => {
    processFinancialSituationDrawerRef.current?.open()
  }

  const afterSave = (situation: ProcessFinancialSituationType) => {
    refetch()
    const value = props.mode === 'multiple' || props.mode === 'tags' ? [...props.value, situation._id] : situation._id
    if (props.onChange) props.onChange(value, { children: situation.description, value: situation._id! })
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Situação Financeira do Processo"
        showSearch
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.children).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        dropdownRender={menu =>
          <div>
            {menu}
            {show_create_button && plan_modules?.Register && permissions?.processFinancialSituation.create &&
            <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
            >
                <PlusOutlined/> Nova situação financeira de processo
            </UnstyledButton>
            }
          </div>
        }
        {...props}
      >
        {financial_situations.map(financial_situation => (
          <Select.Option key={financial_situation._id} value={financial_situation._id} description={financial_situation.description}>
            {financial_situation.description}
          </Select.Option>
        ))}
      </Select>
      <ProcessFinancialSituationDrawer ref={processFinancialSituationDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default ProcessFinancialSituationInput
