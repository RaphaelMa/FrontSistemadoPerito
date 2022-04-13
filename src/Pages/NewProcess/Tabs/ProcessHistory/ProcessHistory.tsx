import React, { useEffect, useState, useRef } from 'react'
import PermissionsContainer from '../../../../Components/Permissions/Container'
import MenuTop from '../../MenuTop'
import { useUserSelector } from '../../../../Redux/UserReducer'
import { useParams } from 'react-router-dom'
import useGetProcessHistory from './useGetProcessHistory'
import messageError from '../../../../Utils/messageError'
import { HistoryType } from 'Pages/History/types'
import HistoryTable from '../../../History/HistoryTable'
import styled from 'styled-components'

const ProcessHistory: React.FC = () => {
  const [process_history, setProcessHistory] = useState<HistoryType[]>([])
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const { id } = useParams()

  const [{ loading }, getProcessHistory] = useGetProcessHistory()


  const loadProcessHistory = async () => {
    if (!id) return

    try {
      const { data } = await getProcessHistory(id)

      if (!data) return
      // const fake_data = []
      //
      // for(let i=0; i < 100; i++) {
      //   fake_data.push({...data[0], _id: String(data[0]._id + i) })
      // }
      //
      // setProcessHistory(fake_data)
      setProcessHistory(data)
    } catch (e) {
      messageError('2702211644')
      console.log(e)
    }
  }

  useEffect(() => {
    loadProcessHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const has_permissions = (!!id && permissions?.plan.update) || (!id && permissions?.process.create)

  const divRef = useRef<HTMLDivElement>(null)

  return (
    <PermissionsContainer has_module={plan_modules?.Process} has_permission={has_permissions}>
      <ContainerStyled>
        <MenuTop activePage="history" id={id}/>

        <TableContainer ref={divRef}>
          <HistoryTable
            data={process_history}
            loading={loading}
            divRef={divRef}
          />
        </TableContainer>
      </ContainerStyled>
    </PermissionsContainer>
  )
}

export default ProcessHistory

const ContainerStyled = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 2rem;
  height: calc(100% - 2rem);
`

const TableContainer = styled.div`
  display: flex;
  margin: 0;
  height: 100%;
`
