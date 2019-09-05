import * as React from 'react'
import './index.css'
import { Layout, Menu, Icon } from 'antd'
import RouterView from '../../routers/RouterView'
import { NavLink } from 'react-router-dom'

interface Routes {
    routes: any
}
const { Sider, Header, Content } = Layout

class Main extends React.Component<Routes> {
    public render() {
        // console.log(this.props)
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken)
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type)
                    }}>
                    <div className="logo" style={{ background: '#fff' }}>
                        <img
                            style={{
                                margin: '16px 28px 16px 5px',
                                width: '178px'
                            }}
                            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg"
                            alt=""
                        />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span
                                className="nav-text"
                                style={{ color: '#fff' }}>
                                <NavLink
                                    to="/main/addQuestion"
                                    style={{ color: '#fff' }}>
                                    添加试题
                                </NavLink>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span
                                className="nav-text"
                                style={{ color: '#fff' }}>
                                <NavLink
                                    to="/main/kindQuestion"
                                    style={{ color: '#fff' }}>
                                    试题分类
                                </NavLink>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span
                                className="nav-text"
                                style={{ color: '#fff' }}>
                                <NavLink
                                    to="/main/searchQuestion"
                                    style={{ color: '#fff' }}>
                                    查看试题
                                </NavLink>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user" />
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <span className="user_slot">
                            <span className="user_avatar">
                                <span className="user_string" />
                            </span>
                            Chenmanjie
                        </span>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div
                            style={{
                                background: '#fff',
                                minHeight: 360,
                                padding: 24
                            }}>
                            <RouterView routes={this.props.routes} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Main
