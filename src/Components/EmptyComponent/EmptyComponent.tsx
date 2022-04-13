import React, { memo } from 'react'
import { Button, Empty } from 'antd'

type EmptyComponentProps = {
  onClick: () => void,
  action_text: string
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({ onClick, action_text }) => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={(
        <span>
          Nenhum dado foi encontrado.<br/>
          <Button type="link" onClick={onClick}>
            Criar {action_text}
          </Button>
        </span>
      )}
    />
  )
}

export default memo(EmptyComponent)
