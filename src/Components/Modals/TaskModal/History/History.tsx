import React, { useEffect, useState } from 'react'
import useGetHistory, { HistoryType } from './useGetHistory'
import styled from 'styled-components'
import moment from 'moment'

type Props = {
  task_id?: string
}

const History: React.FC<Props> = ({ task_id }) => {
  const [data, setData] = useState<HistoryType[]>([])

  const [getHistory] = useGetHistory()

  const loadHistories = async () => {
    const { data } = await getHistory(task_id!)

    setData(data || [])
  }

  useEffect(() => {
    if (task_id) loadHistories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (data.length === 0) return null

  return (
    <div>
      <Title>Histórico</Title>

      {data.map((history, index) => (
        <ListItem key={index}>
          <ItemTitle>
            {moment(history.createAt).format('DD/MM/YYYY')} - {history.user?.user_name} - {history.action.action_name}
          </ItemTitle>

          {history.record?.map((record) => (
            <Item key={record._id}>
              {record.description}
            </Item>
          ))}
        </ListItem>
      ))}
    </div>
  )
}

export default History

const Title = styled.div`
  text-align: center;
  font-size: 20px;
`

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid ${p => p.theme.colors.primary};
  margin-top: 10px;
`

const Item = styled.div`
  &::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${p => p.theme.colors.primary};
    margin-right: 5px;
  }
`

const ItemTitle = styled.div`
  font-size: 16px;
`
