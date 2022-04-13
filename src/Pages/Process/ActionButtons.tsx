import React from 'react'
import { Button, message, Popconfirm, Switch, Tooltip } from 'antd'
import { useUserSelector } from 'Redux/UserReducer'
import { DeleteOutlined, EditOutlined, StarFilled, ImportOutlined } from '@ant-design/icons'
import { ProcessType } from './types'
import { theme } from 'Styles/theme'
import useUpdatePushStatus from './useUpdatePushStatus'
import messageError from 'Utils/messageError'
import useHandleFavorite from './useHandleFavorite'
import styled from 'styled-components'

type Props = {
  process: ProcessType,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  updateProcessFavorite: (process_id: string, value: boolean) => void,
  updateProcessPushStatus: (process_id: string, status: boolean) => void
}

const ActionButtons: React.FC<Props> = (props) => {
  const { process, handleDelete, handleEdit, updateProcessPushStatus, updateProcessFavorite } = props

  const permissions = useUserSelector(state => state.permissions)
  const can_change_push = process.statusImport_key === 'imported'
  const [updatePushStatus, { loading }] = useUpdatePushStatus()
  const [handleFavoriteMutation, { loading: favorite_loading }] = useHandleFavorite()

  const handleChangePushStatus = async (value: boolean) => {
    try {
      const { data: { success, message: msg } } = await updatePushStatus(process._id, value)

      if (success) {
        updateProcessPushStatus(process._id, value)
        return
      }

      message.error(msg)
    } catch (error) {
      messageError('202102071449')
    }
  }

  const handleFavoriteProcess = async (value: boolean) => {
    console.log(value)
    try {
      const { data: { success, message: msg } } = await handleFavoriteMutation(process._id, value)

      if (success) {
        updateProcessFavorite(process._id, value)
        return
      }

      message.error(msg)
    } catch (error) {
      messageError('202115050159')
    }
  }

  return (
    <div>
      {permissions?.process.delete && (
        <Popconfirm
          title={
            <>
              <div>
                O processo será excluído de todas as tarefas, movimentações financeiras e agendamentos em que
                está atrelado.
              </div>
              <div>Deseja continuar?</div>
            </>
          }
          okText="Sim"
          cancelText="Não"
          okType="danger"
          placement="topLeft"
          onConfirm={() => handleDelete(process._id)}
        >
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
          />
        </Popconfirm>
      )}

      {permissions?.process.update && (
        <>
          <Button
            type="text"
            icon={<EditOutlined style={{ color: theme.colors.primary }}/>}
            onClick={() => handleEdit(process._id)}
          />

          <Tooltip title="Abrir o processo em uma nova aba">
            <Button
              type="text"
              icon={<LinkIcon style={{ color: theme.colors.primary }}/>}
              href={`/process/${process._id}`}
              target="_blank"
              rel="noopener noreferrer"
            />
          </Tooltip>

          <Switch
            disabled={!can_change_push}
            size="small"
            checked={process.statusProcessMonitoring}
            loading={loading}
            onChange={handleChangePushStatus}
          />

          <Button
            type="text"
            icon={<StarFilled style={{ color: process.favorite ? theme.colors.orange : '#e6e6e6' }}/>}
            loading={favorite_loading}
            onClick={() => handleFavoriteProcess(!process.favorite)}
          />
        </>
      )}
    </div>
  )
}

export default ActionButtons

const LinkIcon = styled(ImportOutlined)`
  transform: rotateZ(3.142rad);
  cursor: pointer;
`
