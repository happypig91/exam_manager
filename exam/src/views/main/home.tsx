import { Icon, Layout, Menu } from 'antd'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import '../../index.css'
import { inject, observer } from 'mobx-react'

//引入用户路由
import routes from '../../router/routes'
import { filterView } from '../../utils/permission'

//引入国际化
import { injectIntl } from 'react-intl'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

interface Props {
    user?: any
    intl?: any //国际化
    global: any
}
@inject('user', 'global')
@observer
class HomePage extends React.Component<Props> {
    render() {
        let { formatMessage } = this.props.intl //国际化
        let { viewAuthority } = this.props.user
        const { locale } = this.props.global
        console.log('viewAuthority...', viewAuthority)
        let myRoutes: any = filterView(routes, viewAuthority)
        myRoutes = myRoutes[1].children
        console.log('myRoutes...', myRoutes)
        return (
            <Layout style={{ height: '100%' }}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken)
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type)
                    }}>
                    <div className="logo" style={{ backgroundColor: '#fff' }}>
                        <img
                            style={{
                                margin: '8px 28px 16px 5px',
                                width: '178px'
                            }}
                            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
                            alt=""
                        />
                        <button
                            style={{
                                position: 'absolute',
                                top: '1.5%',
                                left: '98%'
                            }}
                            onClick={() => {
                                this.props.global.changeLocale(
                                    locale === 'zh' ? 'en' : 'zh'
                                )
                            }}>
                            {locale === 'zh' ? '中文' : '英文'}
                        </button>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['4']}>
                        {myRoutes.map((item: any) => {
                            if (item.children) {
                                return (
                                    <SubMenu
                                        key={item.path}
                                        title={
                                            <span>
                                                <Icon type="mail" />
                                                <span>
                                                    {item.title
                                                        ? formatMessage({
                                                              id: item.title
                                                          })
                                                        : item.path}
                                                </span>
                                            </span>
                                        }>
                                        {item.children.map((value: any) => {
                                            if (value.title) {
                                                return (
                                                    <Menu.Item key={value.path}>
                                                        <NavLink
                                                            to={value.path}>
                                                            {value.title
                                                                ? formatMessage(
                                                                      {
                                                                          id:
                                                                              value.title
                                                                      }
                                                                  )
                                                                : value.path}
                                                        </NavLink>
                                                    </Menu.Item>
                                                )
                                            } else {
                                                return ''
                                            }
                                        })}
                                    </SubMenu>
                                )
                            } else {
                                return (
                                    <Menu.Item key={item.path}>
                                        <Icon type="pie-chart" />
                                        <span>
                                            {item.title
                                                ? formatMessage({
                                                      id: item.title
                                                  })
                                                : item.path}
                                        </span>
                                    </Menu.Item>
                                )
                            }
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ height: '100%' }}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <span className="user_slot">
                            <span className="user_avatar">
                                <span className="user_string" />
                            </span>
                            Chenmanjie
                        </span>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0',
                            overflow: 'hidden',
                            overflowY: 'scroll'
                        }}>
                        <div>{this.props.children}</div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default injectIntl(HomePage)
