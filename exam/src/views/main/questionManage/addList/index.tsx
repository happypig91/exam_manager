import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Editor from 'for-editor'
import { Select, Input, Button, Modal, message } from 'antd'
import './index.css'
const { Option, OptGroup } = Select
const { confirm } = Modal

interface Props {
    question: any
    countDown: any
}

@inject('question')
@observer
class AddList extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    state = {
        topList: [],
        examType: [],
        titleType: [],
        questions_type_id: '', //试题类型id
        questions_stem: '', //题干
        subject_id: '', //课程id
        exam_id: '', //考试类型id
        user_id: '', //用户id
        questions_answer: '', //题目答案
        title: '' //试题的标题
    }
    componentDidMount() {
        this.getList()
    }
    showConfirm = () => {
        let that = this
        confirm({
            title: '你确定要添加这道题么?',
            content: '真的要添加么',
            onOk() {
                let secondsToGo = 5
                const modal = Modal.success({
                    title: 'This is a notification message',
                    content: `This modal will be destroyed after ${secondsToGo} second.`
                })
                const timer = setInterval(() => {
                    secondsToGo -= 1
                    modal.update({
                        content: `This modal will be destroyed after ${secondsToGo} second.`
                    })
                }, 1000)
                setTimeout(() => {
                    clearInterval(timer)
                    modal.destroy()
                }, secondsToGo * 1000)
                const { getAddexam } = that.props.question
                let {
                    questions_type_id,
                    questions_stem,
                    subject_id,
                    exam_id,
                    user_id,
                    questions_answer,
                    title
                } = that.state
                async function getAddUserInfo() {
                    let result = await getAddexam({
                        questions_type_id,
                        questions_stem,
                        subject_id,
                        exam_id,
                        user_id,
                        questions_answer,
                        title
                    })
                    if (result.code === 1) {
                        message.success(result.msg)
                    }
                }
                getAddUserInfo()
            },
            onCancel() {
                console.log('取消')
            }
        })
    }
    getList = async () => {
        const {
            getQuestionSubject,
            getQuestionsType,
            getQuestionTypes,
            getUserInfo
        } = this.props.question

        let results = await getQuestionSubject()
        let userInfoId = await getUserInfo()
        let typeList = await getQuestionsType()
        let examList = await getQuestionTypes()
        // console.log(result)
        this.setState({
            topList: results.data,
            user_id: userInfoId.data.user_id,
            titleType: typeList.data,
            examType: examList.data
        })
    }
    //获取input框变化的值
    handChange = (e: any) => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    //获取题库题目的变化
    handChangeStem = (value: any) => {
        this.setState({
            questions_stem: value
        })
    }
    //获取答案的参数
    handChangeAnswer = (value: any) => {
        this.setState({
            questions_answer: value
        })
    }
    //获取select参数
    handSelect = (obj: any) => {
        let { value, type } = obj
        this.setState({ [type]: value })
    }

    public render() {
        let { title, questions_stem, questions_answer } = this.state
        return (
            <div>
                <div style={{ fontSize: '18px', margin: '0 0 10px 0' }}>
                    添加试题
                </div>
                <h3>题目信息</h3>
                <div style={{ fontSize: '13px', margin: '0 0 10px 0' }}>
                    题干
                </div>
                <div>
                    <Input
                        className="antd-inp"
                        size="large"
                        placeholder="请输入题目标题，不超过20个字"
                        name="title"
                        value={title}
                        onChange={this.handChange}
                    />
                </div>
                <div style={{ fontSize: '13px', margin: '20px 0 10px 0' }}>
                    题目主题
                </div>
                <div className="for-content">
                    <Editor
                        value={questions_stem}
                        onChange={this.handChangeStem}></Editor>
                </div>
                <div>
                    <div style={{ fontSize: '13px' }}>
                        <div style={{ margin: '20px 0 10px 0' }}>
                            <b>请选择考试类型</b>:
                        </div>
                        <Select
                            defaultValue="周考1"
                            style={{ width: 200 }}
                            onChange={(value: any) =>
                                this.handSelect({ value, type: 'exam_id' })
                            }>
                            <OptGroup label="">
                                {this.state.examType.map((item: any, index) => {
                                    return (
                                        <Option
                                            value={item.exam_id}
                                            key={index}>
                                            {item.exam_name}
                                        </Option>
                                    )
                                })}
                            </OptGroup>
                        </Select>
                    </div>
                    <div style={{ fontSize: '13px' }}>
                        <div style={{ margin: '20px 0 10px 0' }}>
                            <b>请选择课程类型</b>:
                        </div>
                        <Select
                            defaultValue="javaScript上"
                            style={{ width: 200 }}
                            onChange={(value: any) =>
                                this.handSelect({ value, type: 'subject_id' })
                            }>
                            <OptGroup label="">
                                {this.state.topList.map((item: any, index) => {
                                    return (
                                        <Option
                                            value={item.subject_id}
                                            key={index}>
                                            {item.subject_text}
                                        </Option>
                                    )
                                })}
                            </OptGroup>
                        </Select>
                    </div>
                    <div style={{ fontSize: '13px' }}>
                        <div style={{ margin: '20px 0 10px 0' }}>
                            <b>请选择题目类型</b>:
                        </div>
                        <Select
                            defaultValue="简答题"
                            style={{ width: 200 }}
                            onChange={(value: any) =>
                                this.handSelect({
                                    value,
                                    type: 'questions_type_id'
                                })
                            }>
                            <OptGroup label="">
                                {this.state.titleType.map(
                                    (item: any, index) => {
                                        return (
                                            <Option
                                                value={item.questions_type_id}
                                                key={index}>
                                                {item.questions_type_text}
                                            </Option>
                                        )
                                    }
                                )}
                            </OptGroup>
                        </Select>
                    </div>
                    <div style={{ fontSize: '15px', margin: '25px 0 10px 0' }}>
                        答案信息
                    </div>
                    <div className="for-content">
                        <Editor
                            value={questions_answer}
                            onChange={this.handChangeAnswer}></Editor>
                    </div>
                    <div style={{ margin: '20px 0 0px 0' }}>
                        <Button
                            style={{ background: '#0139FD', color: '#fff' }}
                            onClick={this.showConfirm}>
                            提交
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddList
