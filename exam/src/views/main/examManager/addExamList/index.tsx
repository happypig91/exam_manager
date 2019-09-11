import * as React from 'react'
import {Button} from 'antd'
import './index.css'
import {inject,observer} from 'mobx-react'
const ReactMarkdown = require('react-markdown')


interface Props{
  questions:any
}

@inject('examManger')
@observer

class AddExamList extends React.Component<Props>{
  state={
    questions:JSON.parse(window.localStorage.getItem('content')+'') 
  }
  render(){
    console.log(this.state)
    return <div>
      <h2 className="adduser-title">创建试卷</h2>
      <div className="content">
        <Button>添加新题</Button>
        {this.state.questions.map((item:any)=>{
            console.log(item)
            return <div key={item.questions_id}>
               <p>{item.title}</p>
               <ReactMarkdown source={item.questions_stem}></ReactMarkdown>
            </div>
          })}
      </div>
    </div>
  }
}
export default AddExamList