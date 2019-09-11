import * as React from 'react'
import { Button, Select, message } from 'antd'
const { Option } = Select;

interface ViewProps {
  Apiview?: any,
  addViewAuthor?: any
}

class AddViewPage extends React.Component<ViewProps>{
  state = {
    view_authority_text: '',
    view_id: '',
  }
  render() {
    let { Apiview } = this.props;
    return (
      <div className="adduser-wrapper">
        <div className="adduser-input">
          <Button>添加视图接口权限</Button>
        </div>
        <div className="adduser-input">
          <Select placeholder="请选择以有视图" style={{ width: 120 }} onChange={this.handleChange}>
            {Apiview.map((item: any, index: number) => {
              return <Option key={index} value={item.view_id}>{item.view_authority_text}</Option>
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
  handClear=()=>{
    this.setState({
      view_authority_text:'',
      view_id:''
    })
  }
  handleChange = (value: string) => {
    this.setState({
      view_id: value
    }, () => {
      let index = this.props.Apiview.findIndex((item: any) => item.view_id === this.state.view_id);
      this.setState({
        view_authority_text: this.props.Apiview[index].view_authority_text
      })
    })
  }
  handClick = async () => {
    let { addViewAuthor } = this.props.addViewAuthor;
    let result = await addViewAuthor({
      "view_authority_text": this.state.view_authority_text,
      "view_id": this.state.view_id
    })
    if (result.code === 1) {
      message.success(result.msg)
    } else {
      message.error(result.msg)
    }
  }
}

export default AddViewPage