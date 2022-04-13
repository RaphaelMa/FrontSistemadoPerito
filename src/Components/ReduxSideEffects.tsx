import React, { useEffect, useRef, memo } from 'react'
import { fetchInitalData } from 'Redux/fetchActions'
import { useUserSelector } from 'Redux/UserReducer'
import { useNavigate } from 'react-router-dom'
import WelcomeModal, { WelcomeModalType } from 'Components/Modals/Welcome/WelcomeModal'

const ReduxSideEffects: React.FC = () => {
  const navigate = useNavigate()
  const welcomeModalRef = useRef<WelcomeModalType>(null)

  const { is_authenticated, account_verified, show_welcome_modal } = useUserSelector(state => state)

  useEffect(() => {
    if (is_authenticated) fetchInitalData()
  }, [is_authenticated])

  useEffect(() => {
    if (!account_verified) navigate('/active-account')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account_verified])

  useEffect(() => {
    if (show_welcome_modal && account_verified) {
      setTimeout(() => welcomeModalRef?.current?.open(), 500)
    }
  }, [show_welcome_modal, account_verified])

  return <WelcomeModal ref={welcomeModalRef}/>
}

export default memo(ReduxSideEffects)
