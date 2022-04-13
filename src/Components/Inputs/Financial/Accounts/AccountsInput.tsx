import React, { useRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { deburr } from 'lodash'
import useGetAccount, { FinancialAccountType } from './useGetAccounts'
import FinanceAccountDrawer, { FinanceAccountDrawerType } from 'Components/Drawers/FinanceAccount/FinanceAccountDrawer'
import { useUserSelector } from 'Redux/UserReducer'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { PlusOutlined } from '@ant-design/icons'
import { Options } from 'axios-hooks'

type Props = {
  show_create_button?: boolean,
  query_options?: Options
} & SelectProps<any | any[]>

const AccountsInput: React.FC<Props> = ({ show_create_button = false, query_options, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const AccountDrawerRef = useRef<FinanceAccountDrawerType>(null)

  const [{ data: accounts = [], loading }, refetch] = useGetAccount(query_options)

  const onCreateClick = () => {
    AccountDrawerRef.current?.open()
  }

  const afterSave = (account: FinancialAccountType) => {
    refetch()
    const is_multiple = props.mode === 'multiple' || props.mode === 'tags'

    const value = is_multiple ? [...props.value, account._id] : account._id

    if (props.onChange) {
      props.onChange(value, { children: account.description, value: account._id! })
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
        placeholder="Informe..."
        allowClear
        dropdownRender={menu =>
          <div>
            {menu}
            {show_create_button && plan_modules?.Register && permissions?.financial.create && (
              <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
              >
                <PlusOutlined/> Nova conta
              </UnstyledButton>
            )}
          </div>
        }
        {...props}
      >
        {accounts.map(district => (
          <Select.Option key={district._id} value={district._id}>
            {district.description}
          </Select.Option>
        ))}
      </Select>

      <FinanceAccountDrawer ref={AccountDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default AccountsInput
