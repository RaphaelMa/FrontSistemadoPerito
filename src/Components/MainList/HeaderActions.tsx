import React, { memo } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import { FiltersType } from 'Utils/functions'
import SearchInput from 'Components/Inputs/SearchInput'
import ExcelIcon from 'Components/ExcelIcon'

type HeaderActionsProps = {
  onPressEnter: (search: string) => void,
  setFilters: any,
  placeholder: string,
  button_text: string,
  handleNew: () => void,
  has_create_permission?: boolean,
  exportToXLS?: () => void,
}

const HeaderActions: React.FC<HeaderActionsProps> = (props) => {
  const { placeholder, button_text, onPressEnter, setFilters, handleNew, has_create_permission = true, exportToXLS } = props

  return (
    <ActionsContainer>
      <IntWrapper>
        <SearchInput
          onSearch={search => onPressEnter(search)}
          onChange={({ target: { value } }) => {
            value.length === 0 && setFilters((old_filters: FiltersType) => ({ ...old_filters, search: '' }))
          }}
          placeholder={placeholder}
        />
      </IntWrapper>

      <div>
        {!!exportToXLS && (
          <Button onClick={exportToXLS} style={{ marginRight: 10 }}>
            <ExcelIcon />
          </Button>
        )}

        {has_create_permission && <Button type="primary" onClick={() => handleNew()}>{button_text}</Button>}
      </div>
    </ActionsContainer>
  )
}

export default memo(HeaderActions)

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`

const IntWrapper = styled.div`
  display: flex;
  width: 45rem;
`
