import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Button, Col, Input, message, Row } from 'antd'
import { useUserSelector } from 'Redux/UserReducer'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import VariablesInput from './VariablesInput'
import styled from 'styled-components'
import useGetDocument from './useGetDocument'
import messageError from 'Utils/messageError'
import useSaveDocument from './useSaveDocument'
import successModal from 'Utils/successModal'

const Document = () => {
  const permissions = useUserSelector(state => state.permissions)

  const { id } = useParams()
  const navigate = useNavigate()

  const [getDocument, { loading }] = useGetDocument()
  const [saveDocument, { loading: save_loading }] = useSaveDocument()

  const [title, setTitle] = useState()
  const editorRef = useRef(null)

  const loadDocument = useCallback(async (id) => {
    try {
      const response = await getDocument(id)

      const { document } = response?.data

      if (!editorRef.current) return

      setTitle(document.title)
      editorRef.current.data.set(document.data)
    } catch (error) {
      messageError('202108222039')
      console.error(error)
    }
  }, [getDocument])

  useEffect(() => {
    if (!permissions.document.read) {
      navigate('/')
      return
    }
    if (!id) return

    loadDocument(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const addVariable = (variable) => {
    if (!editorRef.current) {
      message.error('Erro ao carregar o editor de texto. Recarregue a página e tente novamente. Se o error ' +
                    'persistir entre contato conosco. Código do erro: 2021221819')
      return
    }

    editorRef.current.model.change(writer => {
      writer.insertText(`${variable} `, editorRef.current.model.document.selection.getFirstPosition())
    })
  }

  const handleSaveDocument = async () => {
    if (!title) {
      message.info('Informe o título do documento!')
      return
    }

    const data = {
      _id: id,
      title: title,
      data: editorRef.current.getData()
    }

    const response = await saveDocument(data)

    const { success } = response.data

    if (success) {
      successModal({ content: 'Documento salvo com sucesso' })
      setTimeout(() => navigate('/documents'), 1500)
      return
    }

    message.error(response.data.message)
  }

  const can_edit = !!id && permissions.document.update
  const can_create = !id && permissions.document.create

  return (
    <Container>
      <Header>
        <Row gutter={10} style={{ width: '100%' }}>
          <Col flex="400px">
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Título do Documento"
            />
          </Col>

          <Col flex="250px">
            <VariablesInput type="people" addVariable={addVariable} />
          </Col>

          <Col flex="250px">
            <VariablesInput type="process" addVariable={addVariable} />
          </Col>
        </Row>

        <div>
          {(can_edit || can_create) && (
            <Button type="primary" onClick={handleSaveDocument} loading={loading || save_loading}>
              Salvar
            </Button>
          )}
        </div>
      </Header>

      <div class="document-editor__toolbar" />

      <EditorRow>
        <div className="editor-container">
          <CKEditor
              editor={Editor}
              config={{
                toolbar: [
                  'undo',
                  'redo',
                  'pageBreak',
                  'horizontalLine',
                  'heading',
                  '|',
                  'fontSize',
                  'fontFamily',
                  'fontColor',
                  'fontBackgroundColor',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  'strikethrough',
                  '|',
                  'numberedList',
                  'bulletedList',
                  'todoList',
                  '|',
                  'outdent',
                  'indent',
                  'alignment',
                  '|',
                  'link',
                  'insertTable',
                  'mediaEmbed',
                  'imageInsert',
                  '|',
                  'highlight',
                  'findAndReplace'
                ],

                language: 'pt-br',

                table: {
                  contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                    'tableCellProperties',
                    'tableProperties'
                  ]
                },

                licenseKey: '',
              }}
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                editorRef.current = editor
                if (!permissions.document.read) return

                document.querySelector('.document-editor__toolbar').appendChild(editor.ui.view.toolbar.element)
                document.querySelector('.ck-toolbar').classList.add('ck-reset_all')
              }}
          />
        </div>
      </EditorRow>
    </Container>
  )
}

export default Document

const Container = styled.div`
  padding: 20px;
`

const EditorRow = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #f2f2f2;
  border: 1px solid hsl(0, 0%, 77%);
  /* 50 do menu principal, 52 do header da pagina, 40 do padding da página, 40 da toolbar */
  height: calc(100vh - 50px - 52px - 40px - 40px);
  overflow: auto;

  h1 {
    font-weight: bold;
  }

  .editor-container {
    width: 100%;
    max-width: 700px;
    height: fit-content;
    background: white;
    border: 1px hsl( 0, 0%, 82.7% ) solid;
    box-shadow: 0 0 5px hsl(0deg 0% 0% / 10%);
  }

  .ck-editor__editable {
    min-height: 700px;
    padding: 40px !important;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`
