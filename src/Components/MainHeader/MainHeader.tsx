import React, { useCallback } from 'react'
import { Menu, PageHeader, Dropdown, Button } from 'antd'
import { useUserSelector, useUserDispatch } from 'Redux/UserReducer'
import { SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { theme } from 'Styles/theme'
import styled from 'styled-components'
import NotificationIcon from 'Components/NotificationIcon/NotificationIcon'
import LogoHeader from '../../Assets/logo_header.png'
import simplur from 'simplur'
import moment from 'moment';

const MainHeader: React.FC = () => {
  const {
    is_authenticated,
    company,
    trial_rest_days: days,
    account_verified,
    loading,
  } = useUserSelector(state => state)
  const permissions = useUserSelector(state => state.permissions)
  const kindUser = useUserSelector(state => state.kindUser)
  const birthday = useUserSelector(state => state.birthday)
  const name = useUserSelector(state => state.userName)
  
  const dispatch = useUserDispatch()
  const formatted_days = days < 0 ? 0 : days

  const trial = company?.trial || false
  const trial_color = days <= 5 ? theme.colors.red : days <= 10 ? theme.colors.yellow : 'unset'

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [dispatch])

  if (!is_authenticated || !account_verified || loading) return null

  const configuration = (
    <Menu style={{ width: '110px' }}>
     {kindUser?.kindUser_key === 'admin' && (
        <Menu.Item key="company">
          <Link to="/company">Empresa</Link>
        </Menu.Item>
      )}
      <Menu.Item key="users">
        <Link to="/users">Usuários</Link>
      </Menu.Item>
      <Menu.Item key="billing">
        <Link to="/billing">Faturamento</Link>
      </Menu.Item>
      {kindUser?.kindUser_key === 'admin' && (
        <Menu.Item key="plans">
          <Link to="/plans">Planos</Link>
        </Menu.Item>
      )}
      <Menu.Item key="logout" onClick={logout}>
        Sair
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      
      <HeaderStyled
        ghost={true}
        backIcon={false}
        title={
          <MenuStyled>

            <Image src={LogoHeader}/>

            <Menu.Item key="dashboard">
              <Link key="dashboard_screen" to="/">Dashboard</Link>
            </Menu.Item>

            <Menu.SubMenu key="registers" title="Cadastros">
              <Menu.Item key="people">
                <Link key="people" to="/people-list">Pessoas</Link>
              </Menu.Item>

              <Menu.Item key="people_kind">
                <Link to="/kind-person-list">Tipo Pessoa</Link>
              </Menu.Item>

              <Menu.Item key="keyword">
                <Link to="/keyword-list">Palavra Chave</Link>
              </Menu.Item>

              <Menu.Item key="county_court">
                <Link to="/judicial-district">Comarca e Vara</Link>
              </Menu.Item>

              {/* <Menu.Item key="document_kind">
               Tipo de Documento
               </Menu.Item> */}

              <Menu.Item key="process_situation">
                <Link to="/process-situation">Situação do Processo</Link>
              </Menu.Item>

              <Menu.Item key="process_nature">
                <Link to="/process-nature">Natureza do Processo</Link>
              </Menu.Item>

              <Menu.Item key="process_finance_status">
                <Link to="/process-financial-situation">Situação Financeira do Processo</Link>
              </Menu.Item>

              <Menu.Item key="object_expert">
                <Link to="/object-expert">Ação/Objeto do Processo</Link>
              </Menu.Item>

              <Menu.Item key="status-impeachments">
                <Link to="/status-impeachments">Status de Impugnação</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu title="Processos" key="process">
              <Menu.Item key="process-list">
                <Link to="/process-list">Processos</Link>
              </Menu.Item>

              <Menu.Item key="process-indicators-situation">
                <Link to="/process-indicators/situation">Indicadores</Link>
              </Menu.Item>

              <Menu.Item key="process-deadlines">
                <Link to="/deadlines">Prazos</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="schedule">
              <Link to="/schedule">Agenda</Link>
            </Menu.Item>

            <Menu.Item key="tasks">
              <Link to="/tasks">Tarefas</Link>
            </Menu.Item>

            <Menu.SubMenu key="financial" title="Financeiro">
              <Menu.Item key="financial-panel">
                <Link to="/financial">Painel</Link>
              </Menu.Item>

              <Menu.Item key="financial-categories">
                <Link to="/financial/categories">Categorias</Link>
              </Menu.Item>

              <Menu.Item key="financial-accounts">
                <Link to="/financial/accounts">Contas</Link>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="fees">
              <Link to="/fees">Honorarios</Link> 
            </Menu.Item>

            <Menu.Item key="history">
              <Link to="/history">Histórico</Link>
            </Menu.Item>

            <Menu.Item key="multi_companies">
              <Link to="/multi-companies">Multiempresas</Link>
            </Menu.Item>

            <Menu.Item key="documents">
              <Link to="/documents">Documentos</Link>
            </Menu.Item>

            <Menu.SubMenu key="helpes" title="Ajuda">

              <Menu.Item key="Dashboards">
                <a href="https://www.youtube.com/watch?v=JKKzZaa8tFE&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS"
                  target='_blank'>Dashboards
                </a>
                </Menu.Item>

              <Menu.Item key="ListProcess">
                <a href="https://www.youtube.com/watch?v=4sk5YAKmZRg&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=2"
                  target='_blank'>Lista Processos e Cadastrar
                </a>
              </Menu.Item>

              <Menu.Item key="ImportProcessPushs">
                <a href="https://www.youtube.com/watch?v=4sk5YAKmZRg&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=2"
                  target='_blank'>Como Ativar o Push
                </a>
              </Menu.Item>

              <Menu.Item key="Anexos">
                <a href="https://www.youtube.com/watch?v=jBk240U4Fgg&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=4"
                  target='_blank'>Anexos
                </a>
              </Menu.Item>

              <Menu.Item key="Agendas">
                <a href="https://www.youtube.com/watch?v=jadGkLdWXDA&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=5"
                  target='_blank'>Agenda
                </a>
              </Menu.Item>

              <Menu.Item key="Tarefas">
                <a href="https://www.youtube.com/watch?v=UkcRTVR3chs&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=6"
                  target='_blank'>Tarefas
                </a>
              </Menu.Item>

              <Menu.Item key="ReportFinancial">
                <a href="https://www.youtube.com/watch?v=sNk98bpCziA&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=7"
                  target='_blank'>Financeiro
                </a>
              </Menu.Item>

              <Menu.Item key="CadastroPessoas">
                <a href="https://www.youtube.com/watch?v=YvzWcFWKaVs&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=8"
                  target='_blank'>Cadastro Pessoas
                </a>
              </Menu.Item>

              <Menu.Item key="CadastroNaturezaProcessos">
                <a href="https://www.youtube.com/watch?v=Rx68bgIoKTE&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=9"
                  target='_blank'>Cadastro Natureza do Processo
                </a>
              </Menu.Item>

              <Menu.Item key="CadastroSituacaoProcesso">
                <a href="https://www.youtube.com/watch?v=GoieF4IDSf4&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=10"
                  target='_blank'>Cadastro Situação do Processo
                </a>
              </Menu.Item>

              <Menu.Item key="CadastroSituacaoFinanceiraProcesso">
                <a href="https://www.youtube.com/watch?v=_mFQORhGMto&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=11"
                  target='_blank'>Cadastro Situação Financeira do Processo
                </a>
              </Menu.Item>

              <Menu.Item key="CadastroComarcaVara">
                <a href="https://www.youtube.com/watch?v=VjT9sr3G8HI&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=12"
                  target='_blank'>Cadastro Comarca e Vara
                </a>
              </Menu.Item>

              <Menu.Item key="PalavraChave">
                <a href="https://www.youtube.com/watch?v=LkICqu_yTmM&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=13"
                  target='_blank'>PalavraChave
                </a>
              </Menu.Item>

              <Menu.Item key="RecebimentoParcialHonorario">
                <a href="https://www.youtube.com/watch?v=g6J7JFB2Zmk&list=PLuIim3BGB6vrn1RFWmH03R0_2zoXE7ZeS&index=14"
                  target='_blank'>Recebimento parcial de Honorário
                </a>
              </Menu.Item>

            </Menu.SubMenu>

            <Menu.Item key="suporte">
              <a href="https://front-suporte-perito.herokuapp.com/"
                target='_blank'>Suporte
              </a>
            </Menu.Item>
          </MenuStyled>
        }

        extra={
          <ExtraWrapper>
            {trial && (
              <TrialContainer color={trial_color}>
                <StatusTrialLine color={trial_color} />

                <TrialText>{simplur`Restam ${formatted_days} dia[|s] de teste!`}</TrialText>

                <HireButton size="small" type="primary">
                  <Link to="/plans">Contratar</Link>
                </HireButton>
              </TrialContainer>
            )}

            {permissions?.notification.read && <NotificationIcon />}

            <Dropdown
              getPopupContainer={(trigger => trigger.parentElement || document.body)}
              trigger={['click']}
              overlay={configuration}
              placement="bottomRight"
            >
              <SettingIcon />
            </Dropdown>
          </ExtraWrapper>
        }
      />
      <AlertsContainer>
        {moment().format('MM-DD') === moment(birthday).format('MM-DD') && (
          <BirthdayMessage>
            <BirthdayMessageContainer>
              Parabéns {name}!! Que todos os seus sonhos sejam realizados e todos os seus desejos sejam alcançados. 🎂 🎉
            </BirthdayMessageContainer>
          </BirthdayMessage>
        )}
      </AlertsContainer> 
    </>
  )
}

export default MainHeader

const HeaderStyled = styled(PageHeader)`
  background:#05323c;
  padding: 0;
  width: 100%;
  height: 5rem;

  .ant-page-header-heading-left {
    margin: 0;
  }

  .ant-page-header-heading-extra {
    margin: 0;
  }
`

const MenuStyled = styled(Menu).attrs({
  mode: 'horizontal',
  triggerSubMenuAction: 'click'
})`
  background:#05323c !important;
  color: ${p => p.theme.colors.white} !important;
  margin: 0;
  border-bottom: none;

  .ant-menu-item a {
    color: ${p => p.theme.colors.white};
  }

  .disabled-label {
    color: ${p => p.theme.colors.light_gray} !important;
  }
`;

export const Image = styled.img`
  width: 42px;
  height: 42px;
`

const SettingIcon = styled(SettingOutlined)`
  color: ${p => p.theme.colors.white};
  font-size: 20px;
  margin-right: 8px;
  height: 100%;
  display: flex;
  align-items: center;
`

const ExtraWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${p => p.theme.colors.white};
  height: 100%;

  .ant-badge {
    line-height: 1;
  }
`

type LineProps = {
  color: string
}

const StatusTrialLine = styled.div<LineProps>`
  height: 100%;
  width: 1.5rem;
  margin-right: 10px;
  background-color: ${p => p.color};
`;

const TrialContainer = styled.div<LineProps>`
  display: flex;
  background-color: ${p => p.theme.colors.primary};
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  padding: 0 ${p => p.color === 'unset' ? 2.5 : 1.5}rem 0 0;
  margin-right: 0.7rem;
`;

const TrialText = styled.p`
  color: ${p => p.theme.colors.white};
  margin: 0 12px 0 0;
`;

const HireButton = styled(Button)`
  border: 1px solid ${p => p.theme.colors.white};
`;

const AlertsContainer = styled.div`
    height: 40px;
`;
const BirthdayMessage = styled.div`
    background-color: #5bb974;
    width: 100%;
    height: 40px;
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const BirthdayMessageContainer = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const ButtonCloseAlert = styled.button`
    background-color: #5bb974;
    border: none;
`;