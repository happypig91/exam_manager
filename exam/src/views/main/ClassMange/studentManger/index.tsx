import * as React from 'react'
import { Select, Button, Table, Input, message } from 'antd'
import { inject, observer } from 'mobx-react'
import './index.css'

const { Option } = Select;
interface Props {
  classmanger: any
}

@inject('classmanger')
@observer

class StudentManger extends React.Component<Props>{
  state = {
    columns: [
      {
        title: '姓名',
        dataIndex: 'student_name'
      },
      {
        title: '学号',
        dataIndex: 'student_id'
      },
      {
        title: '班级',
        dataIndex: 'grade_name'
      },
      {
        title: '教室',
        dataIndex: 'room_text'
      },
      {
        title: '密码',
        dataIndex: 'student_pwd'
      },
      {
        title: '操作',
        dataIndex: 'index',
        render: (text: any, record: any) => <a onClick={() => { this.handDelete(record.key) }}>删除</a>
      },
    ],
    data: [],
    classList: [],
    studentClassList: [],
    value: '',
    classNumber: '',
    studentClassNumber: '',
    student_id: '',
  }
  componentDidMount() {
    this.getList()
  }
  handDelete = (index: any) => {
    console.log(index)
    let { student_id } = this.state.data[index];
    this.setState({
      student_id
    }, async () => {
      let { studentDelet } = this.props.classmanger;
      let result = await studentDelet(this.state.student_id)
      console.log(result)
      if (result.code === 1) {
        message.success(result.msg);
        this.getList();
      }
    })

  }
  getList = async () => {
    let { getStudentClass, getClasses, getClassManger } = this.props.classmanger;
    let result = await getStudentClass();
    let classListData = await getClasses();
    let classMangerList = await getClassManger()
    console.log(result)
    result.data.map((item: any, index: number) => item.key = index)
    if (result.code === 1) {
      this.setState({
        data: result.data,
        classList: classListData.data,
        studentClassList: classMangerList.data
      })
    }
  }
  handInput = async (e: any) => {
    let { value } = e.target;
    if (value) {
      this.setState({
        value
      })
    } else if (value === '') {
      let { getStudentClass } = this.props.classmanger;
      let result = await getStudentClass();
      result.data.map((item: any, index: number) => item.key = index)
      if (result.code === 1) {
        this.setState({
          data: result.data,
          value: '',
        })
      }
    }
  }
  handClick = () => {
    console.log(this.state)
    let { value, classNumber, studentClassNumber } = this.state;
    if (value) {
      let newData = this.state.data.filter((item: any) => item.student_name === value);
      this.setState({
        data: newData
      })
    } else if (classNumber) {
      let newData = this.state.data.filter((item: any) => item.room_text === classNumber);
      this.setState({
        data: newData
      })
    } else if (studentClassNumber) {
      let newData = this.state.data.filter((item: any) => item.grade_name === studentClassNumber);
      this.setState({
        data: newData
      })
    } else if (value && studentClassNumber) {
      let newData = this.state.data.filter((item: any) => item.grade_name === studentClassNumber && item.student_name === value);
      this.setState({
        data: newData
      })
    } else if (value && classNumber) {
      let newData = this.state.data.filter((item: any) => item.room_text === classNumber && item.student_name === value);
      this.setState({
        data: newData
      })
    } else if (classNumber && studentClassNumber) {
      let newData = this.state.data.filter((item: any) => item.grade_name === studentClassNumber && item.room_text === classNumber);
      this.setState({
        data: newData
      })
    } else if (value && studentClassNumber && classNumber) {
      let newData = this.state.data.filter((item: any) => item.grade_name === studentClassNumber && item.room_text === classNumber && item.student_name === value);
      this.setState({
        data: newData
      })
    }
  }
  handSelect = (obj: any) => {
    let { type, value } = obj;
    this.setState({
      [type]: value
    })
  }
  handDeleteValue = () => {
    this.setState({
      value: '',
      classNumber: '',
      studentClassNumber: '',
    },()=>{
      console.log(this.state)
    })
  }
  render() {
    let { columns, data, classList, studentClassList, value ,classNumber,studentClassNumber} = this.state;
    return (
      <div>
        <h2 className="adduser-title">学生管理</h2>
        <div>
          <div className="student-top">
            <div className="student-top-item">
              <Input placeholder="输入学生姓名" value={value} onChange={this.handInput} />
            </div>
            <div className="student-top-item">
              <Select placeholder="请选择教室号" defaultValue={classNumber} style={{ width: 160 }} onChange={(value:any) => this.handSelect({ value, type: 'classNumber' })}>
                {
                  classList.map((item: any, index: number) => {
                    return <Option key={index} value={item.room_text}>{item.room_text}</Option>
                  })
                }
              </Select>
            </div>
            <div className="student-top-item">
              <Select placeholder="班级名" defaultValue={studentClassNumber} style={{ width: 160 }} onChange={(value:any) => this.handSelect({ value, type: 'studentClassNumber' })}>
                {
                  studentClassList.map((item: any, index: number) => {
                    return <Option key={index} value={item.grade_name}>{item.grade_name}</Option>
                  })
                }
              </Select>
            </div>
            <div className="student-top-item"><Button className="student-btn" onClick={this.handClick}>搜索</Button></div>
            <div className="student-top-item"><Button className="student-btn" onClick={this.handDeleteValue}>重置</Button></div>

          </div>
          <div className="student-bottom">
            <Table dataSource={data} columns={columns} />
          </div>
        </div>
      </div>
    )
  }
}
export default StudentManger