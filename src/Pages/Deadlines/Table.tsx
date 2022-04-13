import React, { memo } from 'react'
import { Table } from 'antd'
import { lighten } from 'polished'
import { ColumnsType } from 'antd/lib/table'
import styled from 'styled-components'

type Props = {
  loading: boolean,
  title: string,
  title_color: string,
  data: any[],
  columns: ColumnsType<any>
}

const DeadlineTable: React.FC<Props> = ({ loading, title, title_color, data, columns }) => (
  <Container>
    <Title $color={title_color}>
      {title}
    </Title>

    <Table
      className="header-align-center"
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="_id"
      tableLayout="fixed"
      size="middle"
      bordered
      scroll={{ y: 400 }}
      pagination={{
        defaultPageSize: 7,
        pageSizeOptions: ['7', '20', '50', '100']
      }}
    />
  </Container>
)

export default memo(DeadlineTable)

const Container = styled.div`
  margin-top: 2rem;
`

const Title = styled.div<{ $color: string }>`
  background-color: ${p => lighten(0.45, p.$color)};
  border: 1px solid ${p => p.$color};
  color: ${p => p.$color};
  text-align: center;
  padding: 0.5rem;
`
