import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
import { SearchProps } from 'antd/es/input'

const SearchInput: React.FC<SearchProps> = ({ ...props }) => {
  return (
    <SearchStyled
      placeholder="Digite para procurar"
      allowClear={true}
      autoFocus={true}
      {...props}
    />
  )
}

export default SearchInput

const SearchStyled = styled(Input.Search)`
  border: none;
  width: 100%;
  height: 32px;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;

  &.ant-input-affix-wrapper-focused, &.ant-input-affix-wrapper:focus {
    border-color: ${p => p.theme.colors.primary};
    box-shadow: 0 2px 2px -2px ${p => p.theme.colors.light_gray};
  }

  .ant-input-search-icon::before {
    display: none;
  }
`
