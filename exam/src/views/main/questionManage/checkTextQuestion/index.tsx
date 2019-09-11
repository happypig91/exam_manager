import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Select, Button } from 'antd'
import './index.css'
const { Option, OptGroup } = Select

interface Props {
  question: any
  history: any
}

@inject('question')
@observer
class CheckTextQuestion extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  state = {
    topList: [],
    examQuestion: [],
    examType: [],
    titleType: [],
    current: 0,
    val: '',
    vals: ''
  }
  clicks(ind: any) {
    this.setState({
      current: ind
    })
  }
  componentDidMount() {
    this.getList()
  }
  getList = async () => {
    const {
      getQuestionSubject,
      getQuestionExam,
      getQuestionsType,
      getQuestionTypes
    } = this.props.question
    let result = await getQuestionSubject()
    let resultList = await getQuestionExam()
    let typeList = await getQuestionsType()
    let examList = await getQuestionTypes()
    console.log(result.data)
    this.setState({
      topList: result.data,
      examQuestion: resultList.data,
      titleType: typeList.data,
      examType: examList.data
    })
  }
  public render() {
    return (
      <div>
        <h1 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>
          查看试题
                </h1>
        <div className="ant-top">
          <div className="row">
            <div className="row1" style={{ fontSize: '13px' }}>
              <b>课程类型</b>:
                        </div>
            <div className="row2">
              <div className="control">
                <span className="child">
                  <span className="tag ant-tag-checkable">
                    All
                                    </span>
                  {this.state.topList.map(
                    (item: any, index) => {
                      return (
                        <span
                          className={
                            this.state.current ===
                              index
                              ? 'tag ant-tag-checkable-checked'
                              : 'tag ant-tag-checkable'
                          }
                          key={index}
                          onClick={this.clicks.bind(
                            this,
                            index
                          )}>
                          {item.subject_text}
                        </span>
                      )
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="topList-b">
            <div style={{ fontSize: '13px' }}>
              <b>考试类型</b>:
                            <Select
                defaultValue=""
                style={{ width: 200 }}
                onChange={(value: any) => {
                  // console.log(value)
                  this.setState({
                    val: value
                  })
                }}>
                <OptGroup label="考试类型">
                  {this.state.examType.map(
                    (item: any, index) => {
                      return (
                        <Option
                          value={item.exam_name}
                          key={index}>
                          {item.exam_name}
                        </Option>
                      )
                    }
                  )}
                </OptGroup>
              </Select>
            </div>
            <div style={{ fontSize: '13px' }}>
              <b>题目类型</b>:
                            <Select
                defaultValue=""
                style={{ width: 200 }}
                onChange={(value: any) => {
                  // console.log(value)
                  this.setState({
                    vals: value
                  })
                }}>
                <OptGroup label="题目类型">
                  {this.state.titleType.map(
                    (item: any, index) => {
                      return (
                        <Option
                          value={
                            item.questions_type_text
                          }
                          key={index}>
                          {item.questions_type_text}
                        </Option>
                      )
                    }
                  )}
                </OptGroup>
              </Select>
            </div>
            <div>
              <Button
                type="primary"
                icon="search"
                onClick={() => {
                  let examLists = this.state.examQuestion.filter(
                    (item: any) => {
                      if (
                        (this.state.vals ===
                          item.questions_type_text &&
                          this.state.val ===
                          item.exam_name) ||
                        this.state.vals ===
                        item.questions_type_text ||
                        this.state.val ===
                        item.exam_name
                      ) {
                        return item
                      }
                    }
                  )
                  this.setState({
                    examQuestion: examLists
                  })
                }}>
                查询
                            </Button>
            </div>
          </div>
        </div>

        <Layout>
          <div className="ant-list">
            {this.state.examQuestion.map(
              (item: any, index: number) => {
                return (
                  <div className="antd-list-item" key={index}>
                    <div
                      className="antd-list-item-l"
                      onClick={() => {
                        this.props.history.replace(
                          `/home/question/detail?id=${item.questions_id}`,
                          { id: item.questions_id }
                        )
                        console.log(this.props)
                      }}>
                      <div className="antd-list-item-l-t">
                        <h4
                          style={{
                            fontSize: '16px'
                          }}>
                          {item.title}
                        </h4>
                      </div>
                      <div className="antd-list-item-l-b">
                        <div>
                          <div className="ant-tag ant-tag-blue">
                            {
                              item.questions_type_text
                            }
                          </div>
                          <div className="ant-tag ant-tag-geekblue">
                            {item.subject_text}
                          </div>
                          <div className="ant-tag ant-tag-orange">
                            {item.exam_name}
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: '16px'
                          }}>
                          {item.user_name}发布 </span>
                      </div>
                    </div>
                    <ul className="antd-list-item-r">
                      <li
                        style={{
                          fontSize: '14px'
                        }}>
                        <a
                          style={{
                            fontSize: '14px'
                          }}
                          onClick={() => {
                            this.props.history.replace(
                              `/home/question/checkTextEditor?id=${item.questions_id}`,
                              {
                                id:
                                  item.questions_id
                              }
                            )
                          }}>编辑</a>
                      </li>
                    </ul>
                  </div>
                )
              }
            )}
          </div>
        </Layout>
      </div>
    )
  }
}

export default CheckTextQuestion
