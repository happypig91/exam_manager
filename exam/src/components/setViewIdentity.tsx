import * as React from 'react'
import { Button, Select, message } from 'antd'
const { Option } = Select;

interface SetApiProps {
  Sfid?: any,
  Apiview?: any,
  setViewIdentity?: any
}

class SetApiIdentity extends React.Component<SetApiProps>{
  state = {
    identity_id: '',
    view_authority_id: ''
  }
  handClear = () => {
    this.setState({
      identity_id: '',
      view_authority_id: ''
    })
  }
  handClick = async () => {
    let { identity_id, view_authority_id } = this.state;
    let { setViewIdentity } = this.props.setViewIdentity;
    if (identity_id === '' || view_authority_id === '') {
      message.error('未设置身份视图权限,请设置')
    } else {
      let result = await setViewIdentity({
        "identity_id": identity_id,
        "view_authority_id": view_authority_id
      })
      if (result.code === 1) {
        message.success(result.msg)
      } else {
        message.error(result.msg)
      }
    }

  }
  handleChange = (obj: any) => {
    let { value, type } = obj;
    this.setState({
      [type]: value
    })
  }
  render() {
    let { Sfid, Apiview } = this.props;
    return (
      <div className="adduser-wrapper">
        <div className="adduser-input">
          <Button>给身份设置视图权限</Button>
        </div>
        <div className="adduser-input">
          <Select placeholder="请选择身份id" style={{ width: 120 }} onChange={(value) => this.handleChange({ value, type: 'identity_id' })}>
            {Sfid.map((item: any, index: number) => {
              return <Option key={index} value={item.identity_text}>{item.identity_text}</Option>
            })}
          </Select>
        </div>
        <div className="adduser-input">
          <Select placeholder="请选择视图权限id" style={{ width: 120 }} onChange={(value) => this.handleChange({ value, type: 'view_authority_id' })}>
            {Apiview.map((item: any, index: number) => {
              return <Option key={index} value={item.view_authority_id}>{item.view_authority_text}</Option>
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