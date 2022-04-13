import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Drawer, Button, Input } from 'antd'
import styled from 'styled-components'
import moment from 'moment'

type AnnotatioType = {
  key: React.Key,
  annotationDate: string,
  description: string
}

type OpenType = (annotation?: AnnotatioType) => void

export type AnnotationDrawerRefType = {
  open: OpenType,
  close: () => void,
}

type Props = {
  save: (annotation: AnnotatioType) => void,
}

const ProcessNature: React.ForwardRefRenderFunction<AnnotationDrawerRefType, Props> = ({ save }, ref) => {
  const [annotation, setAnnotation] = useState<AnnotatioType>()
  const [visible, setVisible] = useState(false)

  const open: OpenType = (old_annotation) => {
    if (old_annotation) setAnnotation(old_annotation)
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    setTimeout(() => setAnnotation(undefined), 300)
  }

  useImperativeHandle(ref, () => ({ open, close }))

  const handleChangeAnnotation = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value

    setAnnotation((prev) => {
      if (prev) return { ...prev, description: value }

      return { annotationDate: moment().subtract(3, 'hours').toString(), key: Date.now(), description: value }
    })
  }

  const handleSave = () => {
    if (annotation) save(annotation)
    close()
  }

  return (
    <Drawer
      visible={visible}
      onClose={close}
      title="Anotação"
      width={700}
      footer={
        <Footer>
          <Button onClick={close}>Cancelar</Button>
          <Button disabled={!annotation?.description} onClick={handleSave} type="primary">Salvar</Button>
        </Footer>
      }
    >
      <Input.TextArea autoSize={{ minRows: 2 }} value={annotation?.description} onChange={handleChangeAnnotation}/>
    </Drawer>
  )
}

export default forwardRef(ProcessNature)

const Footer = styled.div`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`
