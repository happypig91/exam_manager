import * as React from 'react'
import { inject, observer } from 'mobx-react'
import {NavLink} from 'react-router-dom'
import { Select, Button, Table } from 'antd'
import * as moment from 'moment'
import './index.css'

const { Option } = Select;
interface Props {
  question: any,
  examManger: any
}

@inject('question', 'examManger')
@observer

class QuestionList extends React.Component<Props> {
  state = {
    topList: [],
    examType: [],
    examQuestion: [],
    columns: [
      {
        title: '试卷信息',
        dataIndex: 'title',
      },
      {
        title: '班级',
        dataIndex: 'grade_name',
      },
      {
        title: '创建人',
        dataIndex: 'user_name',
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
      },
      {
        title: '操作',
        dataIndex: 'age',
        render:()=><NavLink to="/home/exammanager/examQuestionDetail"><b>详情</b></NavLink>
      },
    ]
  }
  componentDidMount() {
    this.getList()
  }
  getList = async () => {
    const {
      getQuestionSubject,
      getQuestionTypes
    } = this.props.question
    const { examListData } = this.props.examManger;
    let result = await getQuestionSubject()
    let examList = await getQuestionTypes()
    let examQuestionListData = await examListData();
    //把table添加上key值
    examQuestionListData.exam.map((item:any,index:number)=>item.key=index)
    //把时间戳改为时间格式
    examQuestionListData.exam.map((item:any)=>item.start_time=moment(Number(item.start_time)).format('YYYY-MM-DD HH:mm:ss'))
    examQuestionListData.exam.map((item:any)=>item.end_time=moment(Number(item.end_time)).format('YYYY-MM-DD HH:mm:ss'))
    this.setState({
      topList: result.data,
      examType: examList.data,
      examQuestion: examQuestionListData.exam
    })
  }
  render() {
    let {examQuestion,columns}=this.state;
    return (
      <div>
        <h2 className="adduser-title">试卷列表</h2>
        <div className="questionList-top">
          <div style={{ fontSize: '13px' }} className="questionList-top-item">
            <b>考试类型</b>:
            <Select defaultValue="" style={{ width: 200 }} onChange={(value: any) => {
              // console.log(value)
              this.setState({
                val: value
              })
            }}>
              {this.state.examType.map(
                (item: any, index) => {
                  return (
                    <Option value={item.exam_name} key={index}>
                      {item.exam_name}
                    </Option>
                  )
                }
              )}
            </Select>
          </div>
          <div style={{ fontSize: '13px' }} className="questionList-top-item">
            <b>课程</b>:
            <Select defaultValue="" style={{ width: 200 }} onChange={(value: any) => {
              this.setState({
                vals: value
              })
            }}>
              {this.state.topList.map(
                (item: any, index) => {
                  return (
                    <Option value={item.subject_id}
                      key={index}>
                      {item.subject_text}
                    </Option>
                  )
                }
              )}
            </Select>
          </div>
          <div className="questionList-top-item">
            <Button style={{ padding: " 0 40px" }} type="primary" icon="search">查询</Button>
          </div>
        </div>
        <div className="questionList-bottom">
          <div>
            <div className="questionList-btn">
              <div className="questionList-btns">
                <h4>试卷列表</h4>
                <div>
                  <Button className="btn-actives">全部</Button>
                  <Button className="btn-actives">进行中</Button>
                  <Button className="btn-actives">已结束</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="questionList-table">
                <Table columns={columns} dataSource={examQuestion}/>
          </div>
        </div>
      </div>
    )
  }
}

export default QuestionList