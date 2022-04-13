import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'
import { setupAxios } from 'Utils/axios_configuration'
import { ThemeProvider } from 'styled-components'
import { hot } from 'react-hot-loader/root'
import { ConfigProvider } from 'antd'
import { theme } from 'Styles/theme'
import AppProvider from 'Components/AppProvider/AppProvider'
import MainHeader from 'Components/MainHeader/MainHeader'
import ReduxSideEffects from 'Components/ReduxSideEffects'
import PrivateRoute from 'Components/PrivateRouter'
import ptBR from 'antd/es/locale/pt_BR'
import moment from 'moment'
import NotFound from 'Components/NotFound'

import 'moment/locale/pt-br'

import './Styles/global.less'
import './Styles/antd.less'

moment.locale('pt-br')

const App: React.FC = () => {
  setupAxios()

  return (
    <ConfigProvider locale={ptBR}>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <BrowserRouter>
            <MainHeader/>
            <ReduxSideEffects/>

            <Routes>
              {PUBLIC_ROUTES.map(route => <Route key={route.path} {...route} />)}
              {PRIVATE_ROUTES.map(route => <PrivateRoute key={route.path} {...route} />)}
              <Route path="*" element={<NotFound/>}/>
            </Routes>

          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default hot(App)
