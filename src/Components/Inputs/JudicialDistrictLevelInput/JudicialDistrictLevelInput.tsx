import React, { useEffect, useRef } from 'react'
import { SelectProps } from 'antd/lib/select'
import { PlusOutlined } from '@ant-design/icons'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { Select } from 'antd'
import { deburr } from 'lodash'
import useGetJudicialDistrictLevels from './useGetJudicialDistrictLevels'
import JudicialDistrictDrawer, { JudicialDistrictDrawerType } from 'Components/Drawers/JudicialDistrict/JudicialDistrict'
import { useUserSelector } from 'Redux/UserReducer'

type Props = {
  judicial_district_id: string,
  show_create_button?: boolean,
} & SelectProps<any | any[]>

// TODO: Ajustar props
const JudicialDistrictLevelInput: React.FC<Props> = ({ judicial_district_id, show_create_button, ...props }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const judicialDistrictDrawerRef = useRef<JudicialDistrictDrawerType>(null)

  const [{ data, loading }, getJudicialDistrictLevels] = useGetJudicialDistrictLevels()

  useEffect(() => {
    if (!judicial_district_id) return

    getJudicialDistrictLevels({ url: `/judicialdistrictlevel/judicialdistrict=${judicial_district_id}` })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [judicial_district_id])

  const onCreateClick = () => {
    judicialDistrictDrawerRef.current?.open(judicial_district_id)
  }

  const afterSave = () => {
    getJudicialDistrictLevels({ url: `/judicialdistrictlevel/judicialdistrict=${judicial_district_id}` })
  }

  const district_levels = data || []

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={loading}
        placeholder="Vara"
        showSearch
        aria-autocomplete="none"
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.children).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        dropdownRender={menu =>
          <div>
            {menu}
            {show_create_button && judicial_district_id && plan_modules?.Register && permissions?.judicialdistrict.update &&
              <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
              >
                <PlusOutlined/> Nova vara
              </UnstyledButton>
            }
          </div>
        }
        {...props}
      >
        {district_levels.map(level => (
          <Select.Option key={level._id} value={level._id}>{level.description}</Select.Option>
        ))}
      </Select>
      <JudicialDistrictDrawer ref={judicialDistrictDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default JudicialDistrictLevelInput
