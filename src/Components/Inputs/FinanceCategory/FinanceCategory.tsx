import React, { useRef } from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { PlusOutlined } from '@ant-design/icons'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { deburr } from 'lodash'
import { CategoryType } from 'Components/Drawers/FincanceCategory/useSaveCategory'
import { useUserSelector } from 'Redux/UserReducer'
import CategoryDrawer, { CategoryDrawerType } from 'Components/Drawers/FincanceCategory/Category'
import useGetCategories from './useGetCategories'

type Props = {
  show_create_button?: boolean,
  afterSave?: () => void,
} & SelectProps<any | any[]>

const CategoryInput: React.FC<Props> = ({ show_create_button, afterSave, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const categoryDrawerRef = useRef<CategoryDrawerType>(null)

  const [{ data, loading }, refetch] = useGetCategories()
  const categories = data || []

  const onCreateClick = () => {
    categoryDrawerRef.current?.open()
  }

  const internalAfterSave = (category: CategoryType) => {
    refetch()
    const value = props.mode === 'multiple' || props.mode === 'tags' ? [...props.value, category._id] : category._id

    props.onChange?.(value, { children: category.description, value: category._id! })

    afterSave?.()
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Categoria"
        showSearch
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.children).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        dropdownRender={menu =>
          <div>
            {menu}
            {show_create_button && plan_modules?.Financial && permissions?.financial.create &&
            <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
            >
                <PlusOutlined/> Nova categoria
            </UnstyledButton>
            }
          </div>
        }
        {...props}
      >
        {categories.map(category => (
          <Select.Option key={category._id} value={category._id}>{category.description}</Select.Option>
        ))}
      </Select>
      <CategoryDrawer ref={categoryDrawerRef} afterSave={internalAfterSave}/>
    </>
  )
}

export default CategoryInput
