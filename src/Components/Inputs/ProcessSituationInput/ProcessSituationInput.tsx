import React, { useRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { PlusOutlined } from '@ant-design/icons'
import { deburr } from 'lodash'
import useGetProcessSituations from './useGetProcessSituations'
import ProcessSituationDrawer, { ProcessSituationDrawerRefType } from 'Components/Drawers/ProcessSituation/ProcessSituation'
import { ProcessSituationType } from 'Components/Drawers/ProcessSituation/types'
import { useUserSelector } from 'Redux/UserReducer'
import { Options } from 'axios-hooks'

type Props = {
  show_create_button?: boolean,
  query_options?: Options
} & SelectProps<any | any[]>

// TODO: Ajustar props
const ProcessSituation: React.FC<Props> = ({ show_create_button, query_options, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const processSituationDrawerRef = useRef<ProcessSituationDrawerRefType>(null)

  const [{ data, loading }, refetch] = useGetProcessSituations(query_options)
  const process_situations = data || []

  const onCreateClick = () => {
    processSituationDrawerRef.current?.open()
  }

  const afterSave = (situation: ProcessSituationType) => {
    refetch()
    const value = props.mode === 'multiple' || props.mode === 'tags' ? [...props.value, situation._id] : situation._id
    if (props.onChange) props.onChange(value, { children: situation.description, value: situation._id! })
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Situação do Processo"
        showSearch
        getPopupContainer={trigger => trigger.parentElement}
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.children).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        dropdownRender={menu =>
          <div>
            {menu}
            {show_create_button && plan_modules?.Register && permissions?.processSituation.create &&
              <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
              >
                <PlusOutlined/> Nova situação do processo
              </UnstyledButton>
            }
          </div>
        }
        {...props}
      >
        {process_situations.map(process_situation => (
          <Select.Option key={process_situation._id} value={process_situation._id} description={process_situation.description}>
            {process_situation.description}
          </Select.Option>
        ))}
      </Select>
      <ProcessSituationDrawer ref={processSituationDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default ProcessSituation
