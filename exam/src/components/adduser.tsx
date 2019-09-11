import * as React from 'react';
import { Button, Input, Select, message } from 'antd';
const { Option } = Select;

interface IProps {
  Sfid?: any;
  aDDuser?: any;
  userId?: any;
}

class AddUser extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    console.log(this.props);
  }
  state = {
    user_name: '',
    user_pwd: '',
    identity_id: '',
    showUpdata: false,
    user_id: ''
  };
  handleChange = (obj: any) => {
    let { value, type } = obj;
    this.setState({
      [type]: value
    });
  };
  getUserId = async () => {
    console.log(this.props);
  };
  render() {
    let { user_name, user_pwd, showUpdata } = this.state;
    let { Sfid, userId } = this.props;
    return (
      <div className='adduser-wrapper'>
        <div className='adduser-input'>
          <Button onClick={this.addUser}>添加用户</Button>
          <Button onClick={this.upDateUser}>更新用户</Button>
        </div>
        <div
          className='adduser-input'
          style={{ display: showUpdata ? 'block' : 'none' }}>
          <Select
            placeholder='请选择身份id'
            style={{ width: 120 }}
            onChange={value =>
              this.handleChange({ value, type: 'user_id' })
            }>
            {userId
              ? userId.map((item: any, index: number) => {
                return (
                  <Option
                    key={index}
                    value={item.user_id}>
                    {item.user_name}
                  </Option>
                );
              })
              : null}
          </Select>
        </div>
        <div className='adduser-input'>
          <Input
            placeholder='user_name'
            name='user_name'
            value={user_name}
            onChange={this.handAddUserValue}
          />
        </div>
        <div className='adduser-input'>
          <Input
            placeholder='user_pwd'
            name='user_pwd'
            value={user_pwd}
            onChange={this.handAddUserValue}
          />
        </div>
        <div className='adduser-input'>
          <Select
            placeholder='请选择身份id'
            style={{ width: 120 }}
            onChange={value =>
              this.handleChange({ value, type: 'identity_id' })
            }>
            {Sfid
              ? Sfid.map((item: any, index: number) => {
                return (
                  <Option
                    key={index}
                    value={item.identity_id}>
                    {item.identity_text}
                  </Option>
                );
              })
              : null}
          </Select>
        </div>
        <div className='adduser-input'>
          <Button className="btn-active" type='primary' onClick={this.handAddUser}>
            确定
					</Button>
          <Button onClick={this.handClick}>重置</Button>
        </div>
      </div>
    );
  }
  handClick = () => {
    this.setState({
      user_name: '',
      user_pwd: '',
      identity_id: '',
      user_id: ''
    })
  }
  addUser = () => {
    this.setState({
      showUpdata: false
    });
  };
  upDateUser = () => {
    this.setState({
      showUpdata: true
    });
  };
  handAddUserValue = (e: any) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  //添加用户信息
  handAddUser = async () => {
    let { user_name, user_pwd, identity_id, user_id } = this.state;
    console.log(user_id);
    if (user_id === '') {
      console.log(1);
      let { getAddUser } = this.props.aDDuser;
      let result = await getAddUser({
        user_name: user_name,
        user_pwd: user_pwd,
        identity_id: identity_id
      });
      if (result.code === 1) {
        message.success(result.msg);
      } else {
        message.error(result.msg);
      }
    } else {
      console.log(2);
      let { updataUser } = this.props.aDDuser;
      let result = await updataUser({
        user_id: user_id,
        user_name: user_name,
        user_pwd: user_pwd,
        identity_id: identity_id
      });
      if (result.code === 1) {
        message.success(result.msg);
        this.setState({
          user_id: ''
        })
      } else {
        message.error(result.msg);
      }
    }
  };
}

export default AddUser;
