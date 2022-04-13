import React, { memo } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

type Props = {
  has_id: boolean,
  loading: boolean,
  submit: () => void,
  close: () => void,
  handleDelete: () => void,
}

const Footer: React.FC<Props> = ({ has_id, loading, submit, close, handleDelete }) => {

  return (
    <Row>
      <Button onClick={close}>Cancelar</Button>
      {has_id && <Button onClick={handleDelete} type="primary" danger loading={loading}>Excluir</Button>}
      <Button type="primary" onClick={submit} loading={loading}>Salvar</Button>
    </Row>
  )
}

export default memo(Footer)

const Row = styled.div`
  position: sticky;
  bottom: 0px;
  background-color: white;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid ${p => p.theme.colors.primary};

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 8px;
  justify-content: flex-end;
`
