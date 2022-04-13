import React, { useState, useEffect } from 'react'
import { Divider, Empty, message } from 'antd'
import { DropzoneOptions } from 'react-dropzone'
import { WarningFilled } from '@ant-design/icons'
import { theme } from 'Styles/theme'
import { uniqueId } from 'lodash'
import moment from 'moment'
import readableSize from 'readable-size'
import Card from '../Card'
import DropzoneInput from 'Components/Inputs/DropzoneInput'
import FileList from './FileList'
import useUploadFile from './useUploadFile'
import useGetFiles from './useGetFiles'
import useDeleteFile from './useDeleteFile'
import messageError from 'Utils/messageError'
import { useUserSelector } from 'Redux/UserReducer'

export type FileType = {
  file?: File,
  created_at: string,
  id: string,
  name: string,
  readable_size: string,
  preview: string,
  progress?: number,
  uploaded: boolean,
  error: boolean,
  message_error?: string,
  url?: string,
}

type Props = {
  process_id?: string
}

const FilesCard: React.FC<Props> = ({ process_id }) => {
  const plan_modules = useUserSelector(state => state.company?.plan.modules)
  const permissions = useUserSelector(state => state.permissions)

  const [files, setFiles] = useState<FileType[]>([])
  const uploadFile = useUploadFile()
  const getFiles = useGetFiles()
  const [deleteFile, { loading }] = useDeleteFile()

  const loadFiles = async () => {
    if (!process_id) return

    try {
      const { data } = await getFiles(process_id)

      const uploaded_files: FileType[] = data.map(file => {
        const size = parseFloat(file.size) * 1000 * 1000

        return {
          id: file._id,
          name: file.name,
          created_at: file.createAt,
          readable_size: readableSize(Math.round(size)),
          preview: file.url,
          uploaded: true,
          error: false,
          url: file.url
        }
      })

      setFiles(uploaded_files)
    } catch (error) {
      console.log('[FilesCard] ', error)
      messageError('202008201537')
    }
  }

  useEffect(() => {
    if (plan_modules?.Attachment && permissions?.attachment.read) loadFiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process_id])

  const onDrop: DropzoneOptions['onDropAccepted'] = (accepted_files) => {
    const uploaded_files = accepted_files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      created_at: moment().utc().format('YYYY-MM-DD'),
      readable_size: readableSize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false
    }))

    setFiles(prev => [...prev, ...uploaded_files])

    // Realiza o upload dos arquivos de forma sincrona
    const promisses = uploaded_files.reduce((promisse, file) => {
      return promisse.then(() => processUpload(file))
    }, Promise.resolve())

    promisses.then()
  }

  const updateFile = (id: string, data: Partial<FileType>) => {
    setFiles(prev => prev.map(file => (
      id === file.id ? { ...file, ...data } : file
    )))
  }

  const onUploadProgress = (id: string, event: any) => {
    const progress = Math.round((event.loaded * 100) / event.total)

    updateFile(id, { progress })
  }

  const processUpload = async (file: FileType) => {
    const data = new FormData()
    data.append('file', file.file!, file.name)

    try {
      const { data: response } = await uploadFile(process_id!, data, (event) => onUploadProgress(file.id, event))
      const { success } = response

      if (success) {
        updateFile(file.id, { uploaded: true, id: response.file!._id, url: response.file!.url })
        return
      }

      updateFile(file.id, { error: true, message_error: response.message })
    } catch (error) {
      console.log('[FilesCard] ', error)
      updateFile(file.id, { error: true, message_error: 'Não foi possível realizar a criação do arquivo!' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteFile(id)

      if (data.success) {
        message.success('Arquivo excluído com sucesso')
        setFiles(prev => prev.filter(file => file.id !== id))
      }
    } catch (error) {
      console.log(error)
      messageError('202008212030')
    }

  }

  if (!plan_modules?.Attachment || !permissions?.attachment.read) return null

  return (
    <Card>
      <Divider orientation="left">Anexos</Divider>
      {process_id
        ? <>
          <DropzoneInput has_permission={permissions?.attachment.create} onDrop={onDrop}/>
          <FileList loading={loading} onDelete={handleDelete} files={files}/>
        </>
        : <Empty
          description="Você pode adicionar arquivos após a criação do processo"
          image={
            <WarningFilled width={100} style={{ fontSize: '100px', color: theme.colors.light_gray }}/>
          }
        />
      }
    </Card>
  )
}

export default FilesCard
