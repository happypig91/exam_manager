import * as React from 'react'
import { Input, Select, InputNumber, DatePicker, message } from 'antd'
import { inject, observer } from 'mobx-react'
import * as moment from 'moment'
import './index.css'

const { Option } = Select;
interface Props {
  question: any,
  examManger: any,
  history: any
}

@inject('question', 'examManger')
@observer

class ExamManage extends React.Component<Props> {
  state = {
    TypeList: [],
    classList: [],
    startValue: moment().startOf('day'),
    endValue: moment().startOf('day'),
    endOpen: false,
    start_time: '',
    end_time: '',
    subject_id: '',
    exam_id: '',
    title: '',
    number: 0,
    questionListData: [],
  }
  componentDidMount() {
    this.getList()
  }

  getList = async () => {
    const { getQuestionSubject, getQuestionTypes } = this.props.question;
    const result = await getQuestionSubject();
    const resultType = await getQuestionTypes();
    if (result.code === 1) {
      this.setState({
        TypeList: result.data,
        classList: resultType.data
      })
    }
  }
  handleChange = (obj: any) => {
    let { value, type } = obj;
    this.setState({
      [type]: value
    })
  }
  disabledStartDate = (startValue: any) => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue: any) => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field: any, value: any) => {
    this.setState({
      [field]: value,
    }, () => {
      this.setState({
        start_time: +moment(this.state.startValue).format('x'),
        end_time: +moment(this.state.endValue).format('x'),
      }, () => {
        console.log(this.state)
      })
    });
  };

  onStartChange = (value: any) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value: any) => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = (open: any) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = (open: any) => {
    this.setState({ endOpen: open });
  };
  handliTnput = (e: any) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  handliTnputNumber = (value: any) => {
    this.setState({
      number: value
    })
  }
  handAddExam = async () => {
    let { addExam } = this.props.examManger;
    let { start_time, end_time, number, title, subject_id, exam_id } = this.state;
    let result = await addExam({
      "start_time": start_time,
      "end_time": end_time,
      "subject_id": subject_id,
      "exam_id": exam_id,
      "title": title,
      "number": number,
    })
    if (result.code === 1) {
      console.log(result)
      window.localStorage.setItem('content', JSON.stringify(result.data.questions))
      message.success(result.msg);
      this.props.history.push('/home/exammanager/addExamList')
    }
  }
  render() {
    let { TypeList, classList, startValue, endValue, endOpen, number, title } = this.state;
    return (
      <div>
        <h2 className="adduser-title">添加考试</h2>
        <div className="examManage">
          <div className="examManage-content">
            <div className="examManage-item">
              *试卷名称:<Input name="title" value={title} onChange={this.handliTnput} />
            </div>
            <div className="examManage-item">
              <p>*选择考试类型:</p>
              <Select defaultValue="" style={{ width: 120 }} onChange={(value: any) => this.handleChange({ value, type: 'exam_id' })}>
                {classList.map((item: any, index: number) => {
                  return <Option key={index} value={item.exam_id}>{item.exam_name}</Option>
                })}
              </Select>
            </div>
            <div className="examManage-item">
              <p>*选择课程:</p>
              <Select defaultValue="" style={{ width: 120 }} onChange={(value: any) => this.handleChange({ value, type: 'subject_id' })}>
                {TypeList.map((item: any, index: number) => {
                  return <Option key={index} value={item.subject_id}>{item.subject_text}</Option>
                })}
              </Select>
            </div>
            <div className="examManage-item">
              <p>*设置题量:</p>
              <InputNumber min={1} max={5} defaultValue={number} onChange={this.handliTnputNumber} />
            </div>
            <div className="examManage-item">
              <p>考试时间:</p>
              <div style={{ display: "flex" }}>
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="开始时间"
                  value={startValue}
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
                <p style={{ padding: '3px 10px' }}>-</p>
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="结束时间"
                  value={endValue}
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
              </div>
            </div>
            <div className="examManage-item">
              <button className="btn" onClick={this.handAddExam}>创建试卷</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ExamManage