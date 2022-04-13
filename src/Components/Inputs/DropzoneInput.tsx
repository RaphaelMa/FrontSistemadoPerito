import React from 'react'
import Dropzone, { DropzoneOptions, FileRejection } from 'react-dropzone'
import styled, { css } from 'styled-components'
import { message } from 'antd'

type Props = {
  onDrop: DropzoneOptions['onDropAccepted'],
  maxSize?: number,
  has_permission?: boolean,
}

const hundred_mb = 104857600

const DropzoneInput: React.FC<Props> = ({ onDrop, maxSize = hundred_mb, has_permission = true }) => {
  const renderDragMessage = (is_drag_active: boolean, is_drag_reject: boolean) => {
    if (!is_drag_active) {
      return <UploadMessage>Arraste arquivos aqui...</UploadMessage>
    }

    if (is_drag_reject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
  }

  const onDropReject = (fileRejections: FileRejection[]) => {
    const max_size_message = `Tamanho máximo é de ${maxSize / (1024 * 1024)} MB!`

    const errors = fileRejections.reduce((acc: string[], file) => {
      if (file.errors.some(e => e.code === 'file-too-large')) {
        return [...acc, `Arquivo ${file.file.name} é muito grande. ${max_size_message}`]
      }

      return acc
    }, [])

    errors.forEach(error => message.error(error))
  }

  return (
    <Dropzone onDropRejected={onDropReject} disabled={!has_permission} onDropAccepted={onDrop} maxSize={maxSize}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  )
}

export default DropzoneInput

const drag_active = css`
  border-color: #78e5d5;
`

const drag_reject = css`
  border-color: #e57878;
`

export const DropContainer = styled.div<{ isDragActive?: boolean, isDragReject?: boolean }>`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;
  ${props => props.isDragActive && drag_active}
  ${props => props.isDragReject && drag_reject}
`

const messageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5'
}

export const UploadMessage = styled.p<{ type?: 'default' | 'error' | 'success' }>`
  display: flex;
  color: ${props => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 0px;
`
