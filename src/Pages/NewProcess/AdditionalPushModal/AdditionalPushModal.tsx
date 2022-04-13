import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Button, Modal, Table } from 'antd'
import useGetTablePrices from './useGetTablePrices'
import styled from 'styled-components'
import { currencyFormatter } from 'Utils/formatters'

export type AdditionalPushModalRefType = {
  open: () => void,
  close: () => void,
}

type Props = {
  onAccept: () => void
}

const AdditionalPushModal: React.ForwardRefRenderFunction<AdditionalPushModalRefType, Props> = ({ onAccept }, ref) => {
  const [visible, setVisible] = useState(false)
  const [getPrices, { loading, data }] = useGetTablePrices()

  const prices = data?.message?.tableAditional

  useEffect(() => {
    if (visible) getPrices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const open = () => {
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({ close, open }))

  const columns = [{
    title: 'Pushs Adicionais',
    dataIndex: 'interval',
    align: 'center' as 'center'
  }, {
    title: 'Valor',
    dataIndex: 'price',
    align: 'center' as 'center',
    render: (price: number) => currencyFormatter(price)
  }]

  return (
    <Modal
      title={null}
      footer={null}
      visible={visible}
      destroyOnClose
      onCancel={close}
      centered
      style={{ top: 20 }}
    >
      <Title>
        <p>Uauuuu, suas importações e monitoramentos estão crescendo! Parabéns!!!</p>
      </Title>
      <Text $size={18}>
        Você atingiu o limite de importações e monitoramentos gratuítos do seu plano, mas fique tranquilo(a) você pode
        realizar novas importações e monitoramentos.
      </Text>
      <Text $size={14}>
        Confira a tabela de preços abaixo e lembre-se, importações e monitoramentos adicionais serão incluídas na sua
        próxima mensalidade.
      </Text>
      <Table
        loading={loading}
        columns={columns}
        dataSource={prices}
        bordered
        pagination={false}
        rowKey="_id"
      />

      <Text style={{ marginTop: 10 }} $size={18} $bold>Deseja continuar?</Text>
      <Footer>
        <Button loading={loading} type="primary" onClick={onAccept}>Sim</Button>
        <Button onClick={close}>Não</Button>
      </Footer>
    </Modal>
  )
}

export default forwardRef(AdditionalPushModal)


const Title = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: 600;

  p {
    margin-bottom: 8px;
  }

  p + p {
    margin-bottom: 22px;
  }
`

const Text = styled.p<{ $size: number, $bold?: boolean }>`
  font-size: ${p => p.$size}px;
  ${p => p.$bold && 'font-weight: 600;'}
  text-align: center;
`

const Footer = styled.div`
  display: flex;
  justify-content: center;

  button {
    min-width: 110px;
  }

  button + button {
    margin-left: 8px;
  }
`
