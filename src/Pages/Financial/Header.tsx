import React from 'react'
import { Form, Input, Col, DatePicker, Select, Button, Row } from 'antd'
import { currencyFormatter } from 'Utils/formatters'
import { initial_headers_filters } from './Financial'
import { Store } from 'antd/lib/form/interface'
import { FiltersType } from 'Utils/functions'
import { FormInstance } from 'antd/lib/form'
import { GeneralFinancial } from './types'
import { theme } from 'Styles/theme'
import AccountsInput from 'Components/Inputs/Financial/Accounts/AccountsInput'
import SearchInput from 'Components/Inputs/SearchInput'
import styled from 'styled-components'
import ExcelIcon from 'Components/ExcelIcon'

type Props = {
  general_financial: GeneralFinancial,
  handleFormChange: (changedFields: Store[]) => void,
  form: FormInstance,
  onPressEnter: (value: string) => void,
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>,
  handleOpenDrawer: () => void,
  exportToXLS: () => void,
}

const Header: React.FC<Props> = (props) => {
  const { general_financial, handleFormChange, form, onPressEnter, setFilters, handleOpenDrawer, exportToXLS } = props

  return (
    <HeaderStyled>
      <CardContainer>
        <Card id="card" style={{ color: theme.colors.light_gray }}>
          <CardText>Total</CardText>
          <CardText>{currencyFormatter(general_financial.total, { cents: true })}</CardText>
        </Card>

        <Card id="card" style={{ color: theme.colors.primary }}>
          <CardText>Receber Hoje</CardText>
          <CardText>{currencyFormatter(general_financial.receive, { cents: true })}</CardText>
        </Card>

        <Card id="card" style={{ color: theme.colors.red }}>
          <CardText>Pagar Hoje</CardText>
          <CardText>{currencyFormatter(general_financial.pay, { cents: true })}</CardText>
        </Card>
      </CardContainer>

      <InputsContainer>
        <Form
          onFieldsChange={handleFormChange}
          style={{ display: 'flex', width: '100%', height: '100%' }}
          layout="vertical"
          form={form}
          initialValues={{
            _id: null,
            start_date: initial_headers_filters.start_date,
            end_date: initial_headers_filters.end_date,
            financialAccount_id: undefined
          }}
        >
          <Form.Item name="_id" noStyle><Input type="hidden"/></Form.Item>

          <RowStyled gutter={5}>
            <Col span={7}>
              <Form.Item name="start_date">
                <DatePicker
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Data inicial"
                  allowClear={false}
                />
              </Form.Item>
            </Col>

            <Col span={7}>
              <Form.Item name="end_date">
                <DatePicker
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Data final"
                  allowClear={false}
                />
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item name="movement_description">
                <Select allowClear placeholder="Movimentação">
                  <Select.Option value="Pagar">Pagar</Select.Option>
                  <Select.Option value="Receber">Receber</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <IntWrapper span={24}>
              <SearchInput
                onSearch={onPressEnter}
                onChange={({ target: { value } }) => (
                  value.length === 0 && setFilters(old_filters => ({ ...old_filters, search: '' }))
                )}
                placeholder="Busque pelo Número do Processo, Pessoa ou Categoria"
              />
            </IntWrapper>
          </RowStyled>

          <Col span={7}>
            <Form.Item name="isPaid">
              <Select style={{ width: '100%' }} allowClear placeholder="Pago?">
                <Select.Option value="true">Está pago</Select.Option>
                <Select.Option value="false">Não está pago</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="financialAccount_id">
              <AccountsInput query_options={{ useCache: false }} placeholder="Conta"/>
            </Form.Item>
          </Col>
        </Form>
      </InputsContainer>

      <ButtonContainer>
        <Button onClick={exportToXLS} style={{ marginRight: 10 }}>
          <ExcelIcon />
        </Button>

        <Button type="primary" onClick={() => handleOpenDrawer()}>Nova Movimentação</Button>
      </ButtonContainer>
    </HeaderStyled>
  )
}

export default Header

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 13rem;
`

const CardContainer = styled.div`
  height: 100%;
  display: flex;
  min-width: 48rem;
  justify-content: space-between;
  align-items: center;
  margin-right: 2rem;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid;
`

const CardText = styled.p`
  margin: 0;
`

const InputsContainer = styled.div`
  height: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  margin-left: 2rem;
`

const RowStyled = styled(Row)`
  display: flex;
  justify-content: space-between;
  margin-right: 1rem !important;
  width: auto;
`

const IntWrapper = styled(Col)``
