import React from 'react'
import { Button, Card, Divider, Skeleton } from 'antd'
import { useUserSelector } from 'Redux/UserReducer'
import { currencyFormatter } from 'Utils/formatters'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

const PlanInformation: React.FC = () => {
  const permissions = useUserSelector(state => state.permissions)

  const navigate = useNavigate()
  const { company, loading } = useUserSelector(state => state)
  const { plan } = company || {}

  return (
    <Container>
      <PlanCard>
        <Divider orientation="left" style={{ marginBottom: 40 }}>Plano</Divider>
        <div className="container">
          <div className="item">
            <Skeleton loading={loading}>
              <Text $bold $marginBottom={10} $size={20}>{plan?.name}</Text>
            </Skeleton>
            <Skeleton loading={loading}>
              <Text $marginBottom={10}>{plan?.annual ? 'Anual' : 'Mensal'}</Text>
            </Skeleton>
          </div>
          <div className="item">
            <Skeleton loading={loading}>
              <Text $bold $marginBottom={10} $size={20}>Push</Text>
            </Skeleton>
            <Skeleton loading={loading}>
              <Text $marginBottom={10}>{plan?.pushFree || 0}</Text>
            </Skeleton>
          </div>
          <div className="item">
            <Skeleton loading={loading}>
              <Text $bold $marginBottom={10} $size={20}>Usuários</Text>
            </Skeleton>
            <Skeleton loading={loading}>
              <Text $marginBottom={10}>{plan?.numUser || 0}</Text>
            </Skeleton>
          </div>
        </div>
        <Skeleton loading={loading}>
          <Text $size={18}>{currencyFormatter(plan?.valuePlan)}</Text>
        </Skeleton>
        {permissions?.plan.read &&
          <ChangeButtonRow>
            <Button onClick={() => navigate('/plans')}>
              Alterar Plano
            </Button>
          </ChangeButtonRow>
        }
      </PlanCard>
      <AditionalCard>
        <Divider orientation="left" style={{ marginBottom: 40 }}>Adicionais</Divider>
        <div className="container">
          <div className="item">
            <Skeleton loading={loading}>
              <Text $bold $marginBottom={10} $size={20}>Push</Text>
            </Skeleton>
            <Skeleton loading={loading}>
              <Text $marginBottom={10}>{plan?.pushAddtional || 0}</Text>
            </Skeleton>
            <Skeleton loading={loading}>
              <Text $marginBottom={10}>{currencyFormatter(plan?.partialValuePushAddtional)}</Text>
            </Skeleton>
          </div>
          <div className="item">
            <Skeleton loading={loading}>
              <Text $bold $marginBottom={10} $size={20}>Usuários</Text>
            </Skeleton>
            <Skeleton loading={loading}>
              <Text $marginBottom={10}>{plan?.numUserAddtional || 0}</Text>
            </Skeleton>
            <Skeleton loading={loading}>
              <Text $marginBottom={10}>{currencyFormatter(plan?.partialValueNumUser)}</Text>
            </Skeleton>
          </div>
        </div>
      </AditionalCard>
    </Container>
  )
}

export default PlanInformation

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin: 0 20px;
  height: 250px;
  gap: 20px;
`

const PlanCard = styled(Card)`
  flex: 1;

  .ant-divider.ant-divider-horizontal {
    margin-top: 0;
  }

  .container {
    display: flex;
    flex-direction: row;

    .item {
      flex: 1;
    }
  }
`

const ChangeButtonRow = styled.div`
  text-align: center;
  margin-top: 10px;
`

const AditionalCard = styled(Card)`
  flex: 1;

  .ant-divider.ant-divider-horizontal {
    margin-top: 0;
  }

  .container {
    display: flex;
    flex-direction: row;

    .item {
      flex: 1;
    }
  }
`

const Text = styled.span<{  $bold?: boolean, $marginBottom?: number, $size?: number }>`
  display: block;
  text-align: center;
  ${p => p.$bold && 'font-weight: 600;'}
  ${p => p.$marginBottom && `margin-bottom: ${p.$marginBottom}px;`}
  ${p => p.$size && `font-size: ${p.$size}px;`}
`
