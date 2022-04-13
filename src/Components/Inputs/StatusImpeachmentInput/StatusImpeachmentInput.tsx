import React, { useRef } from 'react'
import { StatusImpeachment } from '../../Drawers/StatusImpugnation/types'
import { useUserSelector } from '../../../Redux/UserReducer'
import { UnstyledButton } from '../../SistemaDoPerito'
import { PlusOutlined } from '@ant-design/icons'
import { SelectProps } from 'antd/lib/select'
import { Options } from 'axios-hooks'
import { deburr } from 'lodash'
import { Select } from 'antd'
import StatusImpugnationDrawer, { StatusDrawerType } from '../../Drawers/StatusImpugnation/StatusImpugnationDrawer'
import useGetStatusImpeachment from './useGetStatusImpeachment'

const { Option } = Select

type Props = {
  query_options?: Options,
  show_create_button?: boolean
} & SelectProps<any | any[]>

const StatusImpeachmentInput: React.FC<Props> = ({ query_options, show_create_button = false, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const statusImpeachmentDrawerRef = useRef<StatusDrawerType>(null)

  const [{ data, loading }, refetch] = useGetStatusImpeachment(query_options)
  const status_impeachments = data || []


  const onCreateClick = () => {
    statusImpeachmentDrawerRef.current?.open()
  }

  const afterSave = (status: StatusImpeachment) => {
    refetch()
    const value = props.mode === 'multiple' || props.mode === 'tags' ? [...props.value, status._id] : status._id

    if (props.onChange) {
      props.onChange(value, { children: status.description, value: status._id! })
    }
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Selecione..."
        getPopupContainer={trigger => trigger.parentElement}
        showSearch
        filterOption={(raw_value, option) => {
          const value_lower_case = deburr(raw_value).toLowerCase()
          const option_value_lower_case = deburr(option?.children).toLowerCase()

          return option_value_lower_case.indexOf(value_lower_case) >= 0
        }}
        dropdownRender={menu =>
          <div>
            {menu}

            {(!!show_create_button && plan_modules?.Register) && (
              <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
              >
                <PlusOutlined/> Novo status
              </UnstyledButton>
            )}
          </div>
        }
        {...props}
      >
        {status_impeachments.map(process => (
          <Option key={process._id} value={process._id} number={process.description}>
            {process.description}
          </Option>
        ))}
      </Select>

      <StatusImpugnationDrawer ref={statusImpeachmentDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default StatusImpeachmentInput
