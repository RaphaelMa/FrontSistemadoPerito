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
  exportToXLS: () => void,
}

const HeaderActions: React.FC<HeaderActionsProps> = (props) => {
  const { placeholder, button_text, onPressEnter, setFilters, handleNew, exportToXLS } = props

  return (
    <ActionsContainer>
      <IntWrapper>
        <SearchInput
          onSearch={search => onPressEnter(search)}
          onChange={({ target: { value } }) => {
            value.length === 0 && setFilters((old_filters: FiltersType) => ({ ...old_filters, search: '' }))
          }}
          allowClear={true}
          placeholder={placeholder}
          autoFocus={true}
        />
      </IntWrapper>

      <div>
        {!!exportToXLS && (
          <Button onClick={exportToXLS} style={{ marginRight: 10 }}>
            <ExcelIcon />
          </Button>
        )}

        <Button type="primary" onClick={() => handleNew()}>{button_text}</Button>
      </div>
    </ActionsContainer>
  )
}

export default memo(HeaderActions)

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const IntWrapper = styled.div`
  display: flex;
  width: 50%;
`
