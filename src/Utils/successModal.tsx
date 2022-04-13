import React from 'react'
import Lottie from 'react-lottie'
import * as animation from 'Assets/animations/success.json'
import { Modal } from 'antd'
import styled from 'styled-components'

type Props = {
  content?: string | JSX.Element,
  duration?: number,
  onEndDuration?: () => void
}

const successModal = (options?: Props) => {
  const { content, duration = 1500, onEndDuration } = options || {}

  const default_options = ({
    loop: false,
    autoplay: true,
    // @ts-ignore
    animationData: animation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  })

  Modal.success({
    title: <Lottie width={150} height={150} options={default_options}/>,
    icon: null,
    content: <Content>{content}</Content>,
    centered: true,
    okButtonProps: {
      style: { display: 'none' }
    }
  })

  setTimeout(() => {
    onEndDuration?.()
    Modal.destroyAll()
  }, duration)
}

export default successModal

const Content = styled.div`
  text-align: center;
  font-size: 16px;
`
