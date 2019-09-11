import * as React from 'react'
import { Button, Input, message } from 'antd'

interface AddApi {
  addApiIdentity?: any
}

class AddApiIdentity extends React.Component<AddApi>{
  state = {
    api_authority_text: '',
    api_authority_url: '',
    api_authority_method: ''
  }
  render() {
    let { api_authority_method, api_authority_text, api_authority_url } = this.state;
    return (
      <div className="adduser-wrapper">
        <div className="adduser-input">
          <Button>添加api接口权限</Button>
        </div>
        <div className="adduser-input">
          <Input
            placeholder="请输入api接口权限名称"
            name="api_authority_url"
            value={api_authority_url}
            onChange={this.handChange}
          />
        </div>
        <div className="adduser-input">
          <Input
            placeholder="请输入api接口权限url"
            name="api_authority_text"
            value={api_authority_text}
            onChange={this.handChange}
          />
        </div>
        <div className="adduser-input">
          <Input
            placeholder="请输入api接口权限方法"
            name="api_authority_method"
            value={api_authority_method}
            onChange={this.handChange}
          />
        </div>
        <div className="adduser-input">
          <Button type="primary"  className="btn-active" onClick={this.handClick}>确定</Button>
          <Button onClick={this.handClear}>重置</Button>
        </div>
      </div>
    )
  }
  handClick = async () => {
    let { addApiIdentity } = this.props.addApiIdentity;
    let { api_authority_method, api_authority_text, api_authority_url } = this.state;
    let result = await addApiIdentity({
      "api_authority_text": api_authority_url,
      "api_authority_url": api_authority_text,
      "api_authority_method": api_authority_method
    })

    if (result.code === 1) {
      message.success(result.msg)
    } else {
      message.error(result.msg)
    }
  }
  handClear=()=>{
    this.setState({
      api_authority_text: '',
      api_authority_url: '',
      api_authority_method: ''
    }) 
  }
  handChange = (e: any) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
}

export default AddApiIdentity