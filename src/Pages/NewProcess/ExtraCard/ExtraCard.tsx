import React, { memo } from 'react'
import { Tabs, Form } from 'antd'
import { AnnotationType,  } from './AnnotationTab/types'
import { MovementType } from './MovementsTab/types'
import Card from '../Card'
import AnnotationTab from './AnnotationTab/AnnotationTab'
import MovementsTab from './MovementsTab/Movements'

const { TabPane } = Tabs

type Props = {
  movements: MovementType[]
}

const ExtraCard: React.FC<Props> = ({ movements }) => {

  return (
    <Card>
      <Tabs defaultActiveKey="movements">
        <TabPane forceRender tab="Movimentações" key="movements">
          <MovementsTab movements={movements}/>
        </TabPane>

        <TabPane forceRender tab="Anotações" key="annotations">
          <Form.Item shouldUpdate={((prev_values, cur_values) => prev_values.annotation !== cur_values.annotation)}>
            {({ getFieldValue, setFieldsValue }) => {
              const annotations: AnnotationType[] = getFieldValue('annotation')

              return (
                <AnnotationTab annotations={annotations} setFieldsValue={setFieldsValue}/>
              )
            }}
          </Form.Item>
        </TabPane>
      </Tabs>
    </Card>
  )
}

export default memo(ExtraCard)
