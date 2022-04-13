import React, { useRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { PlusOutlined } from '@ant-design/icons'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { deburr } from 'lodash'
import useGetPersonKinds from './useGetPersonKinds'
import PersonKindDrawer, { PersonKindDrawerType } from 'Components/Drawers/PersonKind/PersonKind'
import { PersonKindType } from 'Components/Drawers/PersonKind/useSavePersonKind'
import { useUserSelector } from 'Redux/UserReducer'
import { Options } from 'axios-hooks'

type Props = {
  show_create_button?: boolean,
  query_options?: Options
} & SelectProps<any | any[]>

// TODO: Ajustar props
const PersonKindInput: React.FC<Props> = ({ show_create_button = false, query_options, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const personKindDrawerRef = useRef<PersonKindDrawerType>(null)

  const [{ data, loading }, refetch] = useGetPersonKinds(query_options)
  const kinds = data || []

  const onCreateClick = () => {
    personKindDrawerRef.current?.open()
  }

  const afterSave = (kind: PersonKindType) => {
    refetch()
    const is_multiple_mode = props.mode === 'multiple' || props.mode === 'tags'

    const value = is_multiple_mode ? [...props.value, kind._id] : kind._id

    if (props.onChange) {
      props.onChange(value, { children: kind.description, value: kind._id! })
    }
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Tipo"
        showSearch
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.children).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        dropdownRender={menu => (
          <div>
            {menu}
            {!!show_create_button && plan_modules?.Register && permissions?.kindPeople.create &&
            <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
            >
                <PlusOutlined/> Novo tipo de pessoa
            </UnstyledButton>
            }
          </div>
        )}
        {...props}
      >
        {kinds.map(kind =>
          <Select.Option key={kind._id} value={kind._id}>
            {kind.description}
          </Select.Option>
        )}
      </Select>

      <PersonKindDrawer ref={personKindDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default PersonKindInput
