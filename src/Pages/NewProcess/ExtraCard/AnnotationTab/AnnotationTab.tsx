import React, { useRef } from 'react'
import { Row, Col, DatePicker, Input, Button, Form } from 'antd'
import { AnnotationType } from './types'
import { Store } from 'antd/lib/form/interface'
import styled from 'styled-components'
import AnnotationTable from './AnnotationTable'
import AnnotationDrawer, { AnnotationDrawerRefType } from 'Components/Drawers/AnnotationDrawer/AnnotationDrawer'
import SearchInput from 'Components/Inputs/SearchInput'

type Props = {
  annotations?: AnnotationType[],
  setFieldsValue: (value: Store) => void,
}

const AnnotationTab: React.FC<Props> = ({ annotations, setFieldsValue }) => {
  const annotationDRawerRef = useRef<AnnotationDrawerRefType>(null)

  const handleEdit = (key: React.Key) => {
    const annotation = annotations?.find(annotation => annotation.key === key)

    annotationDRawerRef.current?.open(annotation)
  }

  const handleDelete = (key: React.Key) => {
    const new_annotations = annotations?.filter(annotation => annotation.key !== key)
    setFieldsValue({ annotation: new_annotations })
  }

  const newAnnotation = (annotation: AnnotationType) => {
    if (annotations) {
      const filtered_annotations = annotations?.filter(prev => prev.key !== annotation.key)

      setFieldsValue({ annotation: [...filtered_annotations, annotation] })
      return
    }

    setFieldsValue({ annotation: [annotation] })
  }

  return (
    <>
      <Form.Item noStyle name="annotation">
        <Input type="hidden"/>
      </Form.Item>
      <Row gutter={8} style={{ marginBottom: '8px' }}>
        <Col span={9}>
          <DatePicker.RangePicker style={{ width: '100%', display: 'none' }} format="DD/MM/YYYY"/>
        </Col>
        <Col span={9}>
          <SearchInput placeholder="Informe a anotação"/>
        </Col>
        <Col span={6}>
          <NewAnnotationButton onClick={() => annotationDRawerRef.current?.open()} type="primary">
            Nova Anotação
          </NewAnnotationButton>
        </Col>
      </Row>
      <Row>
        <AnnotationTable
          annotations={annotations}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Row>
      <AnnotationDrawer ref={annotationDRawerRef} save={newAnnotation}/>
    </>
  )
}

export default AnnotationTab

const NewAnnotationButton = styled(Button)`
  width: 100%;
  min-width: 96px;
`
