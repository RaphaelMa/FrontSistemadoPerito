import React, { useRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { deburr } from 'lodash'
import useGetObjectExpert from './useGetObjectExpert'
import { useUserSelector } from 'Redux/UserReducer'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { PlusOutlined } from '@ant-design/icons'
import { ObjectExpertType } from 'Components/Drawers/ObjectExpert/useGetObjectExpert'
import ObjectExpertDrawer, { ObjectExpertDrawerType } from 'Components/Drawers/ObjectExpert/ObjectExpert'

type Props = {
  show_create_button?: boolean,
} & SelectProps<any | any[]>

// TODO: Ajustar props
const ObjectExpertInput: React.FC<Props> = ({ show_create_button = false, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const objectExpertDrawerRef = useRef<ObjectExpertDrawerType>(null)

  const [{ data, loading }, refetch] = useGetObjectExpert()

  const object_experts = data || []

  const onCreateClick = () => {
    objectExpertDrawerRef.current?.open()
  }

  const afterSave = (kind: ObjectExpertType) => {
    refetch()
    const value = props.mode === 'multiple' || props.mode === 'tags' ? [...props.value, kind._id] : kind._id
    if (props.onChange) props.onChange(value, { children: kind.description, value: kind._id! })
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
            {!!show_create_button && plan_modules?.Register && permissions?.kindPeople.create &&
              <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
              >
                <PlusOutlined/> Nova Ação/Objeto do Processo
              </UnstyledButton>
            }
          </div>
        }
        {...props}
      >
        {object_experts.map(expert => (
          <Select.Option key={expert._id} value={expert._id}>{expert.description}</Select.Option>
        ))}
      </Select>

      <ObjectExpertDrawer ref={objectExpertDrawerRef} afterSave={afterSave} />
    </>
  )
}

export default ObjectExpertInput
