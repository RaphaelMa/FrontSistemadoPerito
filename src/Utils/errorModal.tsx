import React from 'react'
import Lottie from 'react-lottie'
import * as animation from 'Assets/animations/error.json'
import { Modal } from 'antd'
import styled from 'styled-components'

type Props = {
  content?: string,
  timeout?: number
}

const errorModal = (options?: Props, timeout = 1500) => {
  const { content } = options || {}

  const default_options = ({
    loop: false,
    autoplay: true,
    // @ts-ignore
    animationData: animation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  })

  Modal.error({
    title: <Lottie width={150} height={150} options={default_options}/>,
    icon: null,
    content: <Content>{content}</Content>,
    centered: true,
    okButtonProps: {
      style: { display: 'none' }
    }
  })

  setTimeout(() => Modal.destroyAll(), timeout)
}

export default errorModal

const Content = styled.div`
  text-align: center;
  font-size: 16px;
`
