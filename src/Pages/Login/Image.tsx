import React from 'react'
import Lottie from 'react-lottie'
import * as animation from 'Assets/animations/login.json'

const Image: React.FC = () => {
  const default_options = ({
    loop: false,
    autoplay: true,
    // @ts-ignore
    animationData: animation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  })

  return (
    <Lottie width={400} height={400} options={default_options}/>
  )
}

export default Image
