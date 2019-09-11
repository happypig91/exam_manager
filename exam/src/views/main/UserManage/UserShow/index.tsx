import * as React from 'react'
import { inject, observer } from 'mobx-react'
import './index.css'
import { Table } from 'antd'


interface Props {
  userShow: any,
  userList: any
}

@inject('userShow')
@observer
class UserShow extends React.Component<Props>{
  state = {
    index: 0,
    userlist: [],
    ShowIndex: 0,
    list: [
      {
        type: 0,
        tabTitle: "用户数据",
        children: [
          {
            title: '用户名',
            dataIndex: "user_name",
            key: "user_name"
          },
          {
            title: '密码',
            dataIndex: "user_pwd",
            key: "user_pwd"
          },
          {
            title: '身份',
            dataIndex: "identity_text",
            key: "identity_text"
          }
        ],
        url: "/user/user"
      },
      {
        type: 1,
        tabTitle: "身份数据",
        children: [
          {
            title: '身份名称',
            dataIndex: "identity_text",
            key: "identity_text"
          }
        ],
        url: "/user/identity"
      },
      {
        type: 2,
        tabTitle: "API接口权限",
        children: [
          {
            title: 'api权限名称',
            dataIndex: "api_authority_text",
            key: "api_authority_text"
          },
          {
            title: 'api权限url',
            dataIndex: "api_authority_url",
            key: "api_authority_url"
          },
          {
            title: 'api权限方法',
            dataIndex: "api_authority_method",
            key: "api_authority_method"
          }
        ],
        url: "/user/api_authority"
      },
      {
        type: 3,
        tabTitle: "身份和api接口关系",
        children: [
          {
            title: '身份名称',
            dataIndex: "identity_text",
            key: "identity_text"
          },
          {
            title: 'api权限名称',
            dataIndex: "api_authority_text",
            key: "api_authority_text"
          },
          {
            title: 'api权限url',
            dataIndex: "api_authority_url",
            key: "api_authority_url"
          },
          {
            title: 'api权限方法',
            dataIndex: "api_authority_method",
            key: "api_authority_method"
          }
        ],
        url: '/user/identity_api_authority_relation'
      },
      {
        type: 4,
        tabTitle: "视图接口权限",
        children: [
          {
            title: '视图权限名称',
            dataIndex: "view_authority_text",
            key: "view_authority_text"
          },
          {
            title: '视图id',
            dataIndex: "view_id",
            key: "view_id"
          }
        ],
        url: '/user/view_authority'
      },
      {
        type: 5,
        tabTitle: "身份和视图权限关系",
        children: [

          {
            title: '身份',
            dataIndex: "identity_text",
            key: "identity_text"
          },
          {
            title: '视图名称',
            dataIndex: "view_authority_text",
            key: "view_authority_text"
          },
          {
            title: '视图id',
            dataIndex: "view_id",
            key: "view_id"
          }
        ],
        url: "/user/identity_view_authority_relation"
      }
    ],
  }
  componentDidMount() {
    this.getList()
  }
  getList = async () => {
    let { getUser } = this.props.userShow;
    let { list } = this.state;
    let result = await getUser(list[0].url);
    result.map((item: any, index: number) => item.key = index)
    this.setState({
      userlist: result
    })
  }
  render() {
    let { userList } = this.props.userShow;
    let { index, userlist, list } = this.state;
    let { ShowIndex } = this.state;
    return <div className="content">
      <h2 className="title">用户展示</h2>
      <div className="user-btn">
        {userList.map((item: any, index: number) => {
          return <ul key={index}>
            <li className={ShowIndex === index ? 'btnactive' : ''} onClick={() => this.handClick(index)}>{item.title}</li>
          </ul>
        })}
      </div>
      <div className="user-content">
        <h2 className="title">{userList[index].title}</h2>
        <Table
          columns={list[ShowIndex].children}
          dataSource={userlist}
        />
      </div>
    </div>
  }
  handClick = (index: any) => {
    this.setState({
      ShowIndex: index
    }, async () => {
      let { getUser } = this.props.userShow;
      let { list } = this.state;
      let result = await getUser(list[index].url);
      result.map((item: any, index: number) => item.key = index)
      this.setState({
        userlist: result,
      })
    })

  }
}

export default UserShow