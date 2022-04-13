import React, { useRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { PlusOutlined } from '@ant-design/icons'
import { deburr } from 'lodash'
import useGetJudicialDistrict from './useGetJudicialDistrict'
import JudicialDistrictDrawer, { JudicialDistrictDrawerType } from 'Components/Drawers/JudicialDistrict/JudicialDistrict'
import { JudicialDistrictType } from 'Components/Drawers/JudicialDistrict/types'
import { useUserSelector } from 'Redux/UserReducer'

type Props = {
  show_create_button?: boolean,
} & SelectProps<any | any[]>

// TODO: Ajustar props
const JudicialDistrictInput: React.FC<Props> = ({ show_create_button = false, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const judicialDistrictDrawerRef = useRef<JudicialDistrictDrawerType>(null)

  const [{ data, loading }, refetch] = useGetJudicialDistrict()
  const districts = data || []

  const onCreateClick = () => {
    judicialDistrictDrawerRef.current?.open()
  }

  const afterSave = (distric: JudicialDistrictType) => {
    refetch()
    const value = props.mode === 'multiple' || props.mode === 'tags' ? [...props.value, distric._id] : distric._id
    if (props.onChange) {
      props.onChange(value, { children: distric.description, value: distric._id! })
    }
  }

  return (
    <>
      <Select<any[]>
        style={{ width: '100%' }}
        showSearch
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.children).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        loading={loading}
        placeholder="Comarca"
        dropdownRender={menu =>
          <div>
            {menu}
            {show_create_button && plan_modules?.Register && permissions?.judicialdistrict.create && (
              <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
              >
                <PlusOutlined/> Nova comarca
              </UnstyledButton>
            )}
          </div>
        }
        {...props}
      >
        {districts.map(district => (
          <Select.Option key={district._id} value={district._id}>{district.description}</Select.Option>
        ))}
      </Select>
      <JudicialDistrictDrawer ref={judicialDistrictDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default JudicialDistrictInput
