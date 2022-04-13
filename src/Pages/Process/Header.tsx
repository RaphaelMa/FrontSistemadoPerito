import React, { Dispatch, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, DatePicker, Dropdown, Menu, Select, Tag, Tooltip } from 'antd'
import { LocalFiltersType, VisibleColumnType, ProcessType, StatusImportType } from './types'
import { LoadingOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useUserSelector } from 'Redux/UserReducer'
import { INITIAL_FILTERS } from './ProcessList'
import { IMPORTED_KEYS } from './useColumns'
import { cloneDeep, deburr } from 'lodash'
import ProcessFinancialSituationInput
  from 'Components/Inputs/ProcessFinnacialSituationInput/ProcessFinancialSituationInput'
import StatusImpeachmentInput from 'Components/Inputs/StatusImpeachmentInput/StatusImpeachmentInput'
import ProcessSituationInput from 'Components/Inputs/ProcessSituationInput/ProcessSituationInput'
import JudicialDistrictInput from 'Components/Inputs/JudicialDistrictInput/JudicialDistrictInput'
import ProcessNatureInput from 'Components/Inputs/ProcessNatureInput/ProcessNatureInput'
import PersonKindInput from 'Components/Inputs/PersonKindInput/PersonKindInput'
import CompanyInput from 'Components/Inputs/CompanyInput/CompanyInput'
import styled from 'styled-components'
import ExcelIcon from 'Components/ExcelIcon'
import PersonInput from '../../Components/Inputs/PersonInput/PersonInput'

const STATUS_IMPORTED_KEYS: { key: StatusImportType, label: string, color: string }[] = [
  { key: 'not_imported', label: 'Não importado', color: IMPORTED_KEYS['not_imported'] },
  { key: 'importing', label: 'Importando', color: IMPORTED_KEYS['importing'] },
  { key: 'imported', label: 'Importado', color: IMPORTED_KEYS['imported'] },
  { key: 'error_importing', label: 'Erro na importação', color: IMPORTED_KEYS['error_importing'] }
]

type Props = {
  filters: LocalFiltersType,
  onPressEnter: (search: string, key: 'search' | 'person_name') => void,
  setFilters: Dispatch<React.SetStateAction<LocalFiltersType>>,
  button_text: string,
  handleNew: () => void,
  process_number: ProcessType[],
  visible_columns?: VisibleColumnType,
  setVisibleColumns: React.Dispatch<React.SetStateAction<VisibleColumnType | undefined>>,
  columns_loading: boolean,
  handleSaveVisibleColumns: () => void,
  save_columns_loading: boolean,
  exportToXLS: () => void,
}

const Header: React.FC<Props> = (props) => {
  const {
    filters, button_text, setFilters, handleNew, visible_columns, setVisibleColumns, columns_loading,
    handleSaveVisibleColumns, exportToXLS, save_columns_loading, process_number
  } = props

  const [visible_columns_menu, setVisibleColumnsMenu] = useState(false)
  const [dates, setDates] = useState<any>(undefined)
  const permissions = useUserSelector(state => state.permissions)
  const plan_modules = useUserSelector(state => state.company?.plan.modules)

  const eventClickPress = useCallback((click) => {
    const is_visible_columns_item = click.target.closest('[data-js="visible-columns"]')

    if (!is_visible_columns_item) {
      setVisibleColumnsMenu(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('click', eventClickPress)

    return () => window.removeEventListener('click', eventClickPress)
  }, [eventClickPress])

  useEffect(() => {
    if (dates?.filter(Boolean).length === 2) {
      setFilters(old_filters => ({ ...old_filters, dates }))
      return
    }

    if (dates?.filter((date: any) => !date).length === 2) {
      setFilters(old_filters => ({ ...old_filters, dates: undefined }))
    }
  }, [dates, setFilters])

  const handleSelectChange = (value: string[] | string, filter_key: string) => {
    if (typeof value === 'object') {
      setFilters(old_filters => ({ ...old_filters, [filter_key]: value.length ? value : undefined }))
      return
    }

    setFilters(old_filters => ({
      ...old_filters,
      [filter_key]: ['true', 'false'].includes(value) ? value === 'true' : value
    }))
  }

  const handleChangeVisibleColumn = useCallback((visible: boolean, key: keyof VisibleColumnType['columns']) => {
    if (!visible_columns) return

    const new_columns = cloneDeep(visible_columns.columns)

    new_columns[key].visible = !visible
    setVisibleColumns(prev => {
      if (!prev) return undefined

      return { ...prev, columns: new_columns }
    })
  }, [setVisibleColumns, visible_columns])

  const menu = useMemo(() => (
    <Menu data-js="visible-columns">
      <MenuGroup>
        {Object.keys(visible_columns?.columns || {})
          .map((key) => {
            // @ts-ignore
            const column_name = visible_columns.columns[key]['description']
            // @ts-ignore
            const visible = visible_columns.columns[key]['visible']

            return (
              <Menu.Item
                key={key}
                // @ts-ignore
                onClick={() => handleChangeVisibleColumn(visible, key)}
              >
                <Checkbox checked={visible}/> {column_name}
              </Menu.Item>
            )
          })}
      </MenuGroup>

      <Menu.Divider style={{ marginTop: 0 }}/>

      <Menu.Item key="save">
        <Button
          onClick={() => {
            setVisibleColumnsMenu(false)
            handleSaveVisibleColumns()
          }}
          style={{ width: '100%' }}
          type="primary"
          loading={save_columns_loading}
        >
          Salvar
        </Button>
      </Menu.Item>
    </Menu>
  ), [handleChangeVisibleColumn, handleSaveVisibleColumns, save_columns_loading, visible_columns])

  return (
    <ActionsContainer>
      <FiltersWrapper>
        <SelectContainer className="filter-item">
          <DatePicker
            format="DD/MM/YYYY"
            style={{ width: '49%' }}
            placeholder="Data inicial"
            value={dates?.[0]}
            allowClear={true}
            onChange={value => setDates([value, dates?.[1]])}
          />

          <DatePicker
            format="DD/MM/YYYY"
            style={{ width: '49%' }}
            placeholder="Data final"
            value={dates?.[1]}
            allowClear={true}
            onChange={value => setDates([dates?.[0], value])}
          />
        </SelectContainer>

        <ProcessSituationInput
          className="filter-item"
          mode="multiple"
          query_options={{ useCache: false }}
          value={filters?.situation_id}
          onChange={(values: string[]) => handleSelectChange(values, 'situation_id')}
          allowClear
        />

        <ProcessFinancialSituationInput
          className="filter-item"
          mode="multiple"
          query_options={{ useCache: true }}
          onChange={(values: string[]) => handleSelectChange(values, 'financialSituation_id')}
          value={filters?.financialSituation_id}
          allowClear
        />

        <JudicialDistrictInput
          className="filter-item"
          mode="multiple"
          allowClear={true}
          value={filters?.judicialDistrict_id}
          onChange={(values: string[]) => handleSelectChange(values, 'judicialDistrict_id')}
        />

        <SelectContainer className="filter-item">
          <Select
            placeholder="Status push"
            style={{ width: '49%' }}
            value={filters?.statusProcessMonitoring === undefined ? undefined : filters.statusProcessMonitoring ? 'true' : 'false'}
            onChange={value => handleSelectChange(value, 'statusProcessMonitoring')}
            allowClear
          >
            <Select.Option value="true">Push ativo</Select.Option>
            <Select.Option value="false">Push inativo</Select.Option>
          </Select>

          <Select
            placeholder="AJG"
            style={{ width: '49%' }}
            value={filters?.freeJustice === undefined ? undefined : filters.freeJustice ? 'true' : 'false'}
            onChange={(value) => handleSelectChange(value, 'freeJustice')}
            allowClear
          >
            <Select.Option value="true">Sim</Select.Option>
            <Select.Option value="false">Não</Select.Option>
          </Select>
        </SelectContainer>

        <ProcessNatureInput
          className="filter-item"
          allowClear={true}
          mode="multiple"
          query_options={{ useCache: true }}
          value={filters?.nature_id}
          placeholder="Natureza do Processo"
          onChange={(values: string[]) => handleSelectChange(values, 'nature_id')}
        />

        <PersonKindInput
          className="filter-item"
          allowClear={true}
          mode="multiple"
          query_options={{ useCache: true }}
          value={filters?.kind_person_id}
          placeholder="Tipo de Pessoa"
          onChange={(values: string[]) => handleSelectChange(values, 'kind_person_id')}
        />

        <Select
          className="filter-item"
          allowClear={true}
          placeholder="Número do Processo"
          onChange={(value) => setFilters(old_filters => ({ ...old_filters, processNumber: value }))}
          showSearch
          value={filters.processNumber}
          autoClearSearchValue
          filterOption={(raw_value, option) => {
            const value = deburr(raw_value).toLowerCase()
            const option_value = deburr(option?.children).toLowerCase()

            return option_value.indexOf(value) >= 0
          }}
        >
          {process_number.map(proc => (
            <Select.Option key={proc.processNumber} value={proc.processNumber}>
              {proc.processNumber}
            </Select.Option>
          ))}
        </Select>

        <SelectContainer className="filter-item">
          <Select
            placeholder="Favorito"
            style={{ width: '49%' }}
            value={filters?.favorite === undefined ? undefined : filters.favorite ? 'true' : 'false'}
            onChange={(value) => handleSelectChange(value, 'favorite')}
            allowClear
          >
            <Select.Option value="true">Sim</Select.Option>
            <Select.Option value="false">Não</Select.Option>
          </Select>

          <Select
            placeholder="Importação"
            style={{ width: '49%' }}
            value={filters.statusImport_key}
            onChange={value => setFilters(old_filters => ({ ...old_filters, statusImport_key: value }))}
            allowClear
          >
            {STATUS_IMPORTED_KEYS.map((record) => (
              <Select.Option value={record.key} key={record.key}>
                <Tag color={record.color}>
                  {record.label}
                </Tag>
              </Select.Option>
            ))}
          </Select>
        </SelectContainer>

        <StatusImpeachmentInput
          className="filter-item"
          allowClear={true}
          mode="multiple"
          placeholder="Status da Impugnação"
          value={filters?.statusImpeachment_id as any}
          onChange={(values: string | string[]) => handleSelectChange(values, 'statusImpeachment_id')}
        />

        <PersonInput
          className="filter-item"
          allowClear={true}
          with_users={true}
          value={filters?.person_id}
          onChange={value => handleSelectChange(value, 'person_id')}
        />

        {!!plan_modules?.Multicompany && (
          <CompanyInput
            className="filter-item"
            allowClear={true}
            mode="multiple"
            query_options={{ useCache: true }}
            value={filters?.multicompany_id as any}
            onChange={(values) => handleSelectChange(values, 'multicompany_id')}
            placeholder="Empresa"
          />
        )}
      </FiltersWrapper>

      <ButtonsContainer>
        {permissions?.process.create && (
          <Button block type="primary" onClick={() => handleNew()}>
            {button_text}
          </Button>
        )}

        <Button
          type="default"
          block
          onClick={() => {
            setDates(INITIAL_FILTERS.dates)
            setFilters(INITIAL_FILTERS)
          }}
        >
          Limpar Filtros
        </Button>

        <ButtonsWrapper>
          <Tooltip title="Exportar para excel">
            <Button onClick={exportToXLS} block style={{ marginRight: 10 }}>
              <ExcelIcon/>
            </Button>
          </Tooltip>

          <Dropdown
            disabled={!visible_columns || columns_loading}
            visible={visible_columns_menu}
            trigger={['click']}
            overlay={menu}
            placement="bottomRight"
          >
            <Tooltip title="Colunas visíveis!">
              <Button
                block
                data-js="visible-columns"
                icon={columns_loading ? <LoadingOutlined/> : <MenuUnfoldOutlined/>}
                onClick={() => setVisibleColumnsMenu(old_state => !old_state)}
              />
            </Tooltip>
          </Dropdown>
        </ButtonsWrapper>

      </ButtonsContainer>
    </ActionsContainer>
  )
}

export default memo(Header)

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 1rem 0;
`

const FiltersWrapper = styled.div`
  display: flex;
  width: 93%;
  flex-wrap: wrap;
  gap: 1rem;

  .filter-item {
    width: 24% !important;
  }

  .ant-select-selector {
    flex-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ant-input-search {
    flex: 1;
    margin-right: 2%;
  }
`

const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0 1rem;
  align-items: flex-start;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;
  justify-content: flex-start;
`

const MenuGroup = styled(Menu.ItemGroup)`
  max-height: 400px;
  overflow: auto;
  margin: 0;
  padding: 0 8px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
`
