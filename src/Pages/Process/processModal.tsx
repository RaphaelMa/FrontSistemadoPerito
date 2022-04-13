import React from 'react'
import Lottie from 'react-lottie'
import * as animation from 'Assets/animations/upload_statement.json'
import { Modal } from 'antd'
import styled from 'styled-components'

const processModal = () => {
  const default_options = ({
    loop: true,
    autoplay: true,
    // @ts-ignore
    animationData: animation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  })

  Modal.info({
    title: <Lottie width={170} height={150} options={default_options}/>,
    icon: null,
    onCancel: () => Modal.destroyAll(),
    content: (
      <Content>
        <span style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
          Seu processo está sendo importado
        </span>
        <span style={{ fontSize: 16, textAlign: 'center' }}>
          Você receberá uma notificação assim que a importação for finalizada
        </span>
      </Content>
    ),
    centered: true,
    okButtonProps: {
      style: { display: 'none' }
    }
  })

  setTimeout(() => Modal.destroyAll(), 5000)
}

export default processModal

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`
