import React, { memo, useMemo } from 'react'
import { Tag } from 'antd'
import { TaskType } from '../Types'
import { lighten } from 'polished'
import styled from 'styled-components'
import moment from 'moment'

type Props = {
  task: TaskType,
  date_format: string,
}

const DateTag: React.FC<Props> = ({ task, date_format }) => {
  const color = useMemo(() => {
    if (task.finished) return 'cyan'

    const current_date = moment().utc()
    const days_to_finish = moment(task.deliveryDate).utc().diff(current_date, 'days')
    if (days_to_finish <= 5) return '#F00C0C'
    if (days_to_finish <= 10) return '#FFD541'
    if (days_to_finish <= 15) return '#FE9111'

    return '#3CA49E'
  }, [task.deliveryDate, task.finished])

  return (
    <StyledTag $color={color}>
      {task.finished ? 'Concluído' : moment(task.deliveryDate).utc().format(date_format)}
    </StyledTag>
  )
}

export default memo(DateTag)

const StyledTag = styled(Tag)<{ $color: string }>`
  border-radius: 5px;
  color: ${p => p.$color};
  border-color: ${p => p.$color};
  background-color: ${p => lighten(0.45, p.$color)};
`
