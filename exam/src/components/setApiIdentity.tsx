import * as React from 'react'
import { Button, Select, message } from 'antd'
const { Option } = Select;

interface SetApiProps {
  Sfid?: any,
  Apitype?: any,
  setApiViewAuthor?: any
}

class SetApiIdentity extends React.Component<SetApiProps>{
  state = {
    identity_id: '',
    api_authority_id: ''
  }
  handClear = () => {
    this.setState({
      identity_id: '',
      api_authority_id: ''
    })
  }
  handleChange = (obj: any) => {
    let { value, type } = obj;
    this.setState({
      [type]: value
    })
  }
  handClick = async () => {
    let { identity_id, api_authority_id } = this.state;
    let { setApiViewAuthor } = this.props.setApiViewAuthor;
    if (identity_id === '' || api_authority_id === '') {
      message.error('未设置api接口权限,请设置')
    } else {
      let result = await setApiViewAuthor({
        "identity_id": identity_id,
        "api_authority_id": api_authority_id
      })
      if (result.code === 1) {
        message.success(result.msg)
      } else {
        message.error(result.msg)
      }
    }

  }
  render() {
    let { Sfid, Apitype } = this.props;
    return (
      <div className="adduser-wrapper">
        <div className="adduser-input">
          <Button>给身份设置api接口权限</Button>
        </div>
        <div className="adduser-input">
          <Select placeholder="请选择身份id" style={{ width: 120 }} onChange={(value) => this.handleChange({ value, type: 'identity_id' })}>
            {Sfid.map((item: any, index: number) => {
              return <Option key={index} value={item.identity_id}>{item.identity_text}</Option>
            })}
          </Select>
        </div>
        <div className="adduser-input">
          <Select placeholder="请选择api接口权限" style={{ width: 120 }} onChange={(value) => this.handleChange({ value, type: 'api_authority_id' })}>
            {Apitype.map((item: any, index: number) => {
              return <Option key={index} value={item.api_authority_id}>{item.api_authority_text}</Option>
            })}
          </Select>
        </div>
        <div className="adduser-input">
          <Button type="primary" className="btn-active" onClick={this.handClick}>确定</Button>
          <Button onClick={this.handClear}>重置</Button>
        </div>
      </div>
    )
  }
}
export default SetApiIdentity