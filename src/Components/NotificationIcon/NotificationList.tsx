import { Button, Menu, Row, Typography } from 'antd'
import * as animation from 'Assets/animations/green_dot.json'
import moment from 'moment'
import React from 'react'
import Lottie from 'react-lottie'
import styled from 'styled-components'
import { NotificationType } from './useGetNotifications'

const { Link } = Typography

type Props = {
  has_general_notification: boolean,
  has_movimentation_notification: boolean,
  handleChangeType: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, new_type: 'geral' | 'movimentation') => void,
  handleReadNotification: (id: string) => void,
  loading: boolean,
  notifications: NotificationType[],
  has_update_permission?: boolean,
}

const NotificationList = ({
                            has_general_notification,
                            has_movimentation_notification,
                            notifications,
                            loading,
                            handleChangeType,
                            handleReadNotification,
                            has_update_permission = true
                          }: Props) => {

  const default_options = ({
    loop: true,
    autoplay: true,
    // @ts-ignore
    animationData: animation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  })

  const has_notification = has_movimentation_notification || has_general_notification

  return (
    <Menu>
      <Header key="header">
        <div className="option" onClick={(event) => handleChangeType(event, 'geral')}>
          {has_general_notification && <Lottie width={15} height={15} options={default_options}/>}
          <span>Gerais</span>
        </div>

        <div className="option" onClick={(event) => handleChangeType(event, 'movimentation')}>
          {has_movimentation_notification && <Lottie width={15} height={15} options={default_options}/>}
          <span>Movimentações</span>
        </div>
      </Header>

      <Menu.Divider style={{ margin: 0 }}/>
      <Container key="container">
        {notifications.length === 0 && !loading && (
          <Content>
            Nenhuma notificação
          </Content>
        )}
        {notifications.map(notification => (
          <Content key={notification._id} title={notification.description}>
            <Title>{moment(notification.createAt, 'YYYY-MM-DD').format('DD/MM/YYYY')} - {notification.module.module_name}</Title>

            <Text onClick={() => window.open(notification.url, '_blank')}>
              {notification.description.split(/\\n|\n/).map((description, index) => (
                <p key={`${notification._id}-${index}`}>{description}</p>
              ))}
            </Text>

            {has_update_permission && (
              <Row justify="end">
                <Link onClick={() => handleReadNotification(notification._id)}>
                  Marcar como lida
                </Link>
              </Row>
            )}
          </Content>
        ))}
      </Container>
      <Menu.Divider style={{ margin: 0 }}/>
      <Footer key="footer">
        <Button disabled={!has_notification} type="primary" onClick={() => handleReadNotification('update-all')}>
          Marcar todas como lidas
        </Button>
      </Footer>
    </Menu>
  )
}

export default NotificationList

const Header = styled(Menu.Item)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 0;
  cursor: default;

  &:hover {
    background-color: transparent;
  }

  div.option {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 5px 20px;
    font-size: 16px;
  }

  div.option:hover {
    background-color: #f5f5f5;
  }
`

const Container = styled(Menu.Item)`
  cursor: default;
  width: 350px;
  max-height: 400px;
  overflow: auto;
  padding: 5px 12px 0 5px;

  &:hover {
    background-color: transparent;
  }
`

const Content = styled.div`
  padding: 0 8px;
  cursor: default;
  white-space: normal;

  &:hover {
    background-color: transparent;
  }

  &:after {
    content: '';
    display: inline-block;
    height: 1px;
    width: 100%;
    margin: 4px 0;
    overflow: hidden;
    line-height: 0;
    background-color: #f0f0f0;
  }
`

const Title = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
`

const Text = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
`

const Footer = styled(Menu.Item)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  margin: 9px 0 5px 0;
  cursor: default;

  &:hover {
    background-color: transparent;
  }
`
