import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { getToken } from 'Utils/user_token'
import store from 'Redux/UserReducer'

const AppProvider: React.FC = ({ children }) => {
  useEffect(() => {
    const data = getToken()
    if (data?.token) store.dispatch({ type: 'LOGIN', payload: data })
  }, [])

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default AppProvider
