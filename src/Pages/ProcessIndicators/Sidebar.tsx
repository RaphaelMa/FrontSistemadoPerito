import React, { memo, useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const extractKey = (pathname: string) => {
  const splited_pathname = pathname.split('/')

  return splited_pathname[splited_pathname.length - 1]
}

const Sidebar: React.FC = () => {
  const location = useLocation()
  const [key, setKey] = useState(extractKey(location.pathname))

  useEffect(() => {
    setKey(extractKey(location.pathname))
  }, [location])

  return (
    <Menu selectedKeys={[key]} mode="inline" style={{ width: 250 }}>
      <Menu.Item key="situation">
        <Link to="/process-indicators/situation">Situação</Link>
      </Menu.Item>
      <Menu.Item key="financial-situation">
        <Link to="/process-indicators/financial-situation">Situação Financeira</Link>
      </Menu.Item>
    </Menu>
  )
}

export default memo(Sidebar)
