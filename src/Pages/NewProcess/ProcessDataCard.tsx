import React, { memo } from 'react'
import { Form, Divider, Row, Col, DatePicker, Select, Input } from 'antd'
import Card from './Card'
import CurrencyInput from 'Components/Inputs/CurrencyInput'
import JudicialDistrictInput from 'Components/Inputs/JudicialDistrictInput/JudicialDistrictInput'
import JudicialDistrictLevelInput from 'Components/Inputs/JudicialDistrictLevelInput/JudicialDistrictLevelInput'
import ProcessSituationInput from 'Components/Inputs/ProcessSituationInput/ProcessSituationInput'
import ProcessFinancialSituationInput
  from 'Components/Inputs/ProcessFinnacialSituationInput/ProcessFinancialSituationInput'
import ProcessNatureInput from 'Components/Inputs/ProcessNatureInput/ProcessNatureInput'
import { ImportOutlined } from '@ant-design/icons'
import ObjectExpertInput from 'Components/Inputs/ObjectExpert/ObjectExpertInput'
import styled from 'styled-components'

type Props = {
  setFieldsValue: (value: any) => void
}

const ProcessDataCard: React.FC<Props> = ({ setFieldsValue }) => {
  const onChangeJudicialDistrict = () => {
    setFieldsValue({ judicialDistrictLevel_id: null })
  }

  return (
    <Card>
      <Divider orientation="left">Dados do Processo</Divider>
      <Row gutter={8}>
        <Col span={5}>
          <Form.Item name="appointmentDate" label="Data da Nomeação">
            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item label="Comarca" name="judicialDistrict_id">
            <JudicialDistrictInput show_create_button onChange={onChangeJudicialDistrict}/>
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            noStyle
            shouldUpdate={((prev_values, cur_values) => prev_values.judicialDistrict_id !== cur_values.judicialDistrict_id)}
          >
            {({ getFieldValue }) => {
              const judicial_district_id = getFieldValue('judicialDistrict_id')

              return (
                <Form.Item name="judicialDistrictLevel_id" label="Vara">
                  <JudicialDistrictLevelInput judicial_district_id={judicial_district_id} show_create_button/>
                </Form.Item>
              )
            }}
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name="passwordProcess" label="Senha">
            <Input.Password autoComplete="new-password"/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item name="situation_id" label="Situação do Processo">
            <ProcessSituationInput show_create_button/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="financialSituation_id" label="Situação Financeira do Processo">
            <ProcessFinancialSituationInput show_create_button/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item name="nature_id" label="Natureza do Processo">
            <ProcessNatureInput show_create_button/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="objetcExpert_id" label="Ação/Objeto Perícia ou Assistência">
            <ObjectExpertInput allowClear show_create_button/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={4}>
          <Form.Item name="processValue" label="Valor Processo">
            <CurrencyInput/>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item name="honoraryValue" label="Honorário Apre.">
            <CurrencyInput/>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item name="arbitraryValue" label="Honorário Arb.">
            <CurrencyInput/>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="freeJustice"
            label="Justiça Gratuita"
          >
            <Select allowClear placeholder="Selecione">
              <Select.Option value="true">Sim</Select.Option>
              <Select.Option value="false">Não</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="acceptAppointment"
            label="Aceitou Nomeação"
          >
            <Select allowClear placeholder="Selecione">
              <Select.Option value="true">Sim</Select.Option>
              <Select.Option value="false">Não</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item shouldUpdate={(prev, curr) => (prev.urlProcess !== curr.urlProcess)}>
            {({ getFieldValue }) => {
              const url = getFieldValue('urlProcess')

              return (
                <Form.Item name="urlProcess" label="Url do Processo">
                  <Input
                    autoComplete="off"
                    addonAfter={<LinkIcon onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}/>}
                  />
                </Form.Item>
              )
            }}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item name="favorite" label="Favorito">
            <Select placeholder="Selecione" allowClear>
              <Select.Option value="true">Sim</Select.Option>
              <Select.Option value="false">Não</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={24}>
          <Form.Item name="processDescription" label="Observações">
            <Input.TextArea autoSize={{ minRows: 4 }} style={{ width: '100%' }}/>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}

export default memo(ProcessDataCard)

const LinkIcon = styled(ImportOutlined)`
  transform: rotateZ(3.142rad);
  cursor: pointer;
`
