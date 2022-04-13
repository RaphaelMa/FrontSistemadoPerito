import React, { useState, useEffect, useRef, memo } from 'react'
import { Badge, Dropdown, message } from 'antd'
import { ReactComponent as NotificationSvg } from 'Assets/icons/notification.svg'
import { useUserSelector } from 'Redux/UserReducer'
import Icon from '@ant-design/icons'
import NotificationList from './NotificationList'
import useHasNotification from './useHasNotification'
import useGetNotifications from './useGetNotifications'
import useReadNotification from './useReadNotification'
import messageError from 'Utils/messageError'

const NotificationIcon: React.FC = () => {
  const [type, setType] = useState<'geral' | 'movimentation'>('geral')
  const [visible, setVisible] = useState(false)
  const [{ data: has_notification_data }, hasNotification] = useHasNotification()
  const [{ loading, data }, getNotifications] = useGetNotifications()
  const [readNotification] = useReadNotification()
  const { trial, toHire } = useUserSelector(state => state.company) || {}
  const trial_rest_days = useUserSelector(state => state.trial_rest_days)
  const permissions = useUserSelector(state => state.permissions)

  const fetchNotificationInterval = useRef<number | null>(null)

  const has_notification = has_notification_data?.notification ?? false

  const fetchHasNotification = () => {
    if (fetchNotificationInterval.current) clearInterval(fetchNotificationInterval.current)

    fetchNotificationInterval.current = setInterval(hasNotification, 1 * 60 * 1000)
  }

  useEffect(() => {
    if (toHire || (trial && trial_rest_days > 0)) {
      setTimeout(hasNotification, 1000) // Tem o timeout para dar tempo de setar o token do axios
      fetchHasNotification()
    }

    return () => {
      if (fetchNotificationInterval.current) clearInterval(fetchNotificationInterval.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toHire, trial, trial_rest_days])

  useEffect(() => {
    if (visible && has_notification) getNotifications()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, has_notification])

  const handleChangeType = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, new_type: 'geral' | 'movimentation') => {
    event.preventDefault()

    setType(new_type)
  }

  const handleReadNotification = async (id: string) => {
    try {
      const { data } = await readNotification(id)
      if (data?.success) {
        getNotifications()
        hasNotification()
        return
      }

      // Se não deu certo, é provavel que os próximos tbm irão falhar
      if (fetchNotificationInterval.current) clearInterval(fetchNotificationInterval.current)
      message.error('Não foi possível atualizar a notificação')
    } catch (error) {
      // Se não deu certo, é provavel que os próximos tbm irão falhar
      if (fetchNotificationInterval.current) clearInterval(fetchNotificationInterval.current)

      console.log(error)
      messageError('202010121846')
    }
  }

  const notifications = data || []
  const filtered_notifications = notifications.filter(notification => {
    const movement_types = ['movement', 'key_word']

    if (type === 'movimentation' && movement_types.includes(notification.module.module_id)) return true
    return type === 'geral' && !movement_types.includes(notification.module.module_id)
  })

  const has_general_notification = notifications.some(notification => !notification.module.module_id)
  const has_movimentation_notification = notifications.some(notification => notification.module.module_id)

  return (
    <Dropdown
      overlay={() => NotificationList({
        handleChangeType,
        handleReadNotification,
        has_general_notification,
        has_movimentation_notification,
        loading,
        notifications: filtered_notifications,
        has_update_permission: permissions?.notification.update
      })}
      trigger={['click']}
      placement="bottomRight"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Badge
        offset={[-14, 7]}
        status={has_notification ? 'success' : undefined}
      >
        <Icon
          component={NotificationSvg}
          style={{ fontSize: '24px', marginRight: '8px', cursor: 'pointer' }}
        />
      </Badge>
    </Dropdown>
  )
}

export default memo(NotificationIcon)
