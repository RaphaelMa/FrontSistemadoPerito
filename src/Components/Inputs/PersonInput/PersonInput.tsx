import React, { useEffect, useRef, memo } from 'react'
import { Select, Divider, Tag } from 'antd'
import { SelectProps } from 'antd/lib/select'
import { UnstyledButton } from 'Components/SistemaDoPerito'
import { PlusOutlined } from '@ant-design/icons'
import { deburr, isEqual } from 'lodash'
import { PersonType } from 'Components/Drawers/Person/useSavePerson'
import useGetPeople from './useGetPeople'
import useGetUsers from './useGetUsers'
import PersonDrawer, { PersonDrawerType } from 'Components/Drawers/Person/Person'
import { useUserSelector } from 'Redux/UserReducer'
import { Options } from 'axios-hooks'

export type AllDataType = {
  _id: string,
  active?: boolean,
  name: string,
  email?: string,
  cellPhone?: string,
  areaId?: string,
  areaDescription?: string,
  type: 'people' | 'user',
}

type Props = {
  with_users?: boolean,
  show_create_button?: boolean,
  // As props abaixo são usadas para quando as opções vem de fora
  person_options?: AllDataType[], // Opções externas
  fetch_options?: boolean, // Se é para fazer a busca dentro do componente ou não
  refetch?: () => void, // Refaz a busca das opções externas
  external_loading?: boolean, // Loading externo
  query_options?: Options
} & SelectProps<any | any[]>

// TODO: Ajustar props
const PeopleInput: React.FC<Props> = (props) => {
  const {
    with_users = false,
    query_options,
    show_create_button,
    person_options,
    fetch_options = true,
    refetch,
    external_loading,
    ...rest
  } = props

  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const personDrawerRef = useRef<PersonDrawerType>(null)

  const [{ data: people = [], loading: people_loading }, getPeople] = useGetPeople()
  const [{ data: users = [], loading: users_loading }, getUsers] = useGetUsers()

  const all_data: AllDataType[] = [...(person_options || [])]
  people.forEach(person => all_data.push({ ...person, type: 'people' }))
  users.forEach(user => all_data.push({ ...user, type: 'user' }))

  useEffect(() => {
    if (fetch_options) {
      getPeople()

      if (with_users) getUsers()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [with_users])

  const onCreateClick = () => {
    personDrawerRef.current?.open()
  }

  const afterSave = (people: PersonType) => {
    if (fetch_options || typeof refetch === 'undefined') {
      getPeople()
      console.log('[PersonInput] Normal')
    } else {
      refetch()
      console.log('[PersonInput] Refetch')
    }
    const value = props.mode === 'multiple' || props.mode === 'tags' ? [...props.value, people._id] : people._id
    if (props.onChange) props.onChange(value, { children: people.name, value: people._id! })
  }

  return (
    <>
      <Select
        style={{ width: '100%' }}
        loading={people_loading || users_loading || external_loading}
        placeholder="Pessoa"
        showSearch
        filterOption={(raw_value, option) => {
          const value = deburr(raw_value).toLowerCase()
          const option_value = deburr(option?.name).toLowerCase()

          return option_value.indexOf(value) >= 0
        }}
        dropdownRender={menu =>
          <div>
            {menu}
            {show_create_button && plan_modules?.Register && permissions?.people.create &&
              <UnstyledButton
                style={{ display: 'block', padding: 8 }}
                className="no-decoration"
                onClick={onCreateClick}
              >
                <PlusOutlined/> Nova pessoa
              </UnstyledButton>
            }
          </div>
        }
        {...rest}
      >
        {all_data.map(person => (
          <Select.Option key={person._id} value={person._id} name={person.name}>
            <div title={person.name}>
              {with_users &&
                <>
                  <Tag color={person.type === 'people' ? 'blue' : 'red'}>
                    {person.type === 'people' ? 'Pessoa' : 'Usuário'}
                  </Tag>
                  <Divider type="vertical"/>
                </>
              }
              {person.name}
            </div>
          </Select.Option>
        ))}
      </Select>
      <PersonDrawer ref={personDrawerRef} afterSave={afterSave}/>
    </>
  )
}

export default memo(PeopleInput, isEqual)
