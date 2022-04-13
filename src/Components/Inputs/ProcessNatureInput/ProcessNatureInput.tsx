import React, { useRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { PlusOutlined } from '@ant-design/icons'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { deburr } from 'lodash'
import useGetProcessNatures from './useGetProcessNatures'
import ProcessNatureDrawer, { ProcessNatureDrawerRefType } from 'Components/Drawers/ProcessNature/ProcessNature'
import { ProcessNatureType } from 'Components/Drawers/ProcessNature/types'
import { useUserSelector } from 'Redux/UserReducer'
import { Options } from 'axios-hooks'

type Props = {
  show_create_button?: boolean,
  query_options?: Options
} & SelectProps<any | any[]>

// TODO: Ajustar props
const ProcessNatureInput: React.FC<Props> = ({ show_create_button = false, query_options, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const processNatureDrawerRef = useRef<ProcessNatureDrawerRefType>(null)

  const [{ data, loading }, refetch] = useGetProcessNatures(query_options)
  const natures = data || []

  const onCreateClick = () => {
    processNatureDrawerRef.current?.open()
  }

  const afterSave = (nature: ProcessNatureType) => {
    refetch()
    const value = props.mode === 'multiple' || props.mode === 'tags' ? [...props.value, nature._id] : nature._id
    if (props.onChange) props.onChange(value, { children: nature.description, value: nature._id! })
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Natureza do processo"
        showSearch
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.children).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        dropdownRender={menu =>
          <div>
            {menu}
            {show_create_button && plan_modules?.Register && permissions?.processNature.create &&
              <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
              >
                <PlusOutlined/> Nova natureza do processo
              </UnstyledButton>
            }
          </div>
        }
        {...props}
      >
        {natures.map(nature => (
          <Select.Option key={nature._id} value={nature._id}>{nature.description}</Select.Option>
        ))}
      </Select>
      <ProcessNatureDrawer ref={processNatureDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default ProcessNatureInput
