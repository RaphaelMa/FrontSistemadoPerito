import React, { memo } from 'react'
import { Tabs, Tooltip, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LockOutlined } from '@ant-design/icons'

const { TabPane } = Tabs
const { Link } = Typography

type Props = {
  id?: string,
  activePage?: string
}

const MenuTop: React.FC<Props> = ({ id, activePage = 'process' }) => {
  const navigate = useNavigate()

  const onTabClick = (key: string) => {
    if (key === 'process') {
      navigate(`/process/${id}`)
      return
    }

    navigate(`/process/${id}/${key}`)
  }

  return (
    <Tabs defaultActiveKey={activePage} centered onTabClick={onTabClick}>
      <TabPane tab={<Link>Processo</Link>} key="process" />

      <TabPane
        tab={
          <Tooltip placement="bottom" title="Em breve no sistema">
              <span>
                Documentos <LockOutlined/>
              </span>
          </Tooltip>
        }
        key="document"
        disabled={true}
      />

      <TabPane tab={<Link>Financeiro</Link>} key="financial" />

      <TabPane tab={<Link>Tarefas</Link>} key="tasks" />

      <TabPane tab={<Link>Histórico</Link>} key="history" />
    </Tabs>
  )
}

export default memo(MenuTop)
