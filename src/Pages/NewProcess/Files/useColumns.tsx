import React, { useMemo } from 'react'
import { FileType } from './FilesCard'
import { ColumnsType } from 'antd/es/table'
import { Progress, Tooltip, Button } from 'antd'
import { ReactComponent as ExportIcon } from 'Assets/icons/icon_export.svg'
import { theme } from 'Styles/theme'
import Icon, { CheckCircleTwoTone, InfoCircleTwoTone, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import styled from 'styled-components'
import { useUserSelector } from 'Redux/UserReducer'

type UseColumnsProps = {
  handleDelete: (id: string) => void,
}

const useColumns = ({ handleDelete }: UseColumnsProps): ColumnsType<FileType> => {
  const permissions = useUserSelector(state => state.permissions)

  return useMemo(() => ([
    {
      title: 'Data',
      dataIndex: 'created_at',
      key: 'created_at',
      defaultSortOrder: 'descend',
      width: 150,
      align: 'center',
      sorter: (a, b) => {
        if (a.created_at < b.created_at) return -1
        if (a.created_at > b.created_at) return 1

        return 0
      },
      render: (created_at) => (
        moment(created_at).utc().format('DD/MM/YYYY HH:mm')
      )
    }, {
      title: 'Arquivo',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1

        return 0
      },
      render: (name: string, file: FileType) => {
        return (
          <FileInfo>
            <strong title={name}>{name}</strong>
            <span>
              {file.readable_size}
            </span>
          </FileInfo>
        )
      }
    },
    {
      title: 'Ações',
      key: 'actions',
      align: 'center',
      width: 120,
      render: (file: FileType) => (
        <div>
          {!file.uploaded && !file.error &&
            <Progress
              type="circle"
              showInfo={false}
              strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
              percent={file.progress}
              width={20}
              strokeWidth={15}
            />
          }
          {file.url &&
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon component={ExportIcon} style={{ marginRight: 8, fontSize: 20 }} color="#222"/>
            </a>
          }

          {file.uploaded && <CheckCircleTwoTone style={{ fontSize: 20 }} twoToneColor="#52c41a" />}
          {file.error &&
            <Tooltip title={file.message_error}>
              <InfoCircleTwoTone style={{ fontSize: 20 }} twoToneColor={theme.colors.red} />
            </Tooltip>
          }
          {!!file.url && permissions?.attachment.delete &&
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: theme.colors.red }}/>}
              onClick={() => handleDelete(file.id)}
            />
          }
        </div>
      ),
    },
  ]), [handleDelete, permissions])
}

export default useColumns

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;

  strong {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }
  span {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
    button {
      border: 0;
      background: transparent;
      color: #e57878;
      margin-left: 5px;
      cursor: pointer;
    }
  }
`
