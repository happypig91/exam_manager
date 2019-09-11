import * as React from 'react'
import { Button, Input, message } from 'antd'

interface IProps {
  addIdentity?: any
}

class AddUser extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props)
  }
  state = {
    identity_text: '',
  }
  handAddUserValue = (e: any) => {
    let { value } = e.target;
    this.setState({
      identity_text: value
    })
  }
  render() {
    let { identity_text } = this.state;
    return (
      <div className="adduser-wrapper">
        <div className="adduser-input">
          <Button>添加身份</Button>
        </div>
        <div className="adduser-input">
          <Input placeholder="请输入身份名称" name="identity_text" value={identity_text} onChange={this.handAddUserValue} />
        </div>
        <div className="adduser-input">
          <Button type="primary" className="btn-active" onClick={this.handClickSf}>确定</Button>
          <Button onClick={this.handClear}>重置</Button>
        </div>
      </div>
    )
  }
  handClear=()=>{
    this.setState({
      identity_text:''
    })
  }
  //添加身份
  handClickSf = async () => {
    let { identity_text } = this.state;
    let { getAddIdentity } = this.props.addIdentity;
    let result = await getAddIdentity({
      "identity_text": identity_text
    })
    if (result.code === 1) {
      message.success(result.msg)
    } else {
      message.error(result.msg)
    }
  }
}

export default AddUser