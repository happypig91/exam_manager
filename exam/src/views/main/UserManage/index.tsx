import * as React from 'react'

class UserManage extends React.Component{
  render(){
    return <div>
      {this.props.children}
    </div>
  }
}
export default UserManage