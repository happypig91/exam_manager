import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Editor from 'for-editor'
import { Select, Input, Button, Modal } from 'antd'
const { Option, OptGroup } = Select
const { confirm } = Modal

interface Props {
    question: any
    countDown: any
    history: any
    state: any
}

@inject('question')
@observer
class CheckTextEditor extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    state = {
        examQuestion: [],
        topList: [],
        examType: [],
        titleType: [],
        updateList: '',
        ind: '',
        value: ''
    }
    clicks(ind: any) {
        this.setState({
            current: ind
        })
    }
    componentDidMount() {
        this.getList()
    }
    showConfirm(msgs: any) {
        confirm({
            title: '你确定要修改这道题么?',
            content: '真的要修改么',
            onOk() {
                let secondsToGo = 5
                const modal = Modal.success({
                    title: msgs,
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
            },
            onCancel() {
                console.log('取消')
            }
        })
    }
    getList = async () => {
        const {
            getQuestionExam,
            getQuestionSubject,
            getQuestionsType,
            getQuestionTypes,
            getUpdataexam
        } = this.props.question
        let resultList = await getQuestionExam()
        let results = await getQuestionSubject()
        let typeList = await getQuestionsType()
        let examList = await getQuestionTypes()
        let updataList = await getUpdataexam({
            question_ids: this.state.ind
        })
        console.log(updataList)
        this.setState({
            examQuestion: resultList.data,
            topList: results.data,
            titleType: typeList.data,
            examType: examList.data,
            updateList: updataList.msg
        })
    }
    componentWillMount() {
        this.setState({
            ind: this.props.history.location.state.id
        })
    }
    public render() {
        const { ind, updateList } = this.state
        return (
            <div>
                <div style={{ fontSize: '18px', margin: '0 0 10px 0' }}>
                    编辑试题
                </div>
                {this.state.examQuestion.map((item: any, index: number) => {
                    return ind === item.questions_id ? (
                        <div key={index}>
                            <h3>题目信息</h3>
                            <div
                                style={{
                                    fontSize: '13px',
                                    margin: '0 0 10px 0'
                                }}>
                                题干
                            </div>
                            <div>
                                <Input
                                    className="antd-inp"
                                    size="large"
                                    defaultValue={item.title}
                                    placeholder="请输入题目标题，不超过20个字"
                                    onChange={e => {
                                        console.log(this.state.value)
                                        this.setState({
                                            value: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    fontSize: '13px',
                                    margin: '20px 0 10px 0'
                                }}>
                                题目主题
                            </div>
                            <div className="for-content">
                                <Editor value={item.questions_stem}></Editor>
                            </div>
                            <div>
                                <div style={{ fontSize: '13px' }}>
                                    <div style={{ margin: '20px 0 10px 0' }}>
                                        <b>请选择考试类型</b>:
                                    </div>
                                    <Select
                                        defaultValue={item.exam_name}
                                        style={{ width: 200 }}>
                                        <OptGroup label="">
                                            {this.state.examType.map(
                                                (item: any, index) => {
                                                    return (
                                                        <Option
                                                            value={
                                                                item.exam_name
                                                            }
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
                                    <div style={{ margin: '20px 0 10px 0' }}>
                                        <b>请选择课程类型</b>:
                                    </div>
                                    <Select
                                        defaultValue={item.subject_text}
                                        style={{ width: 200 }}>
                                        <OptGroup label="">
                                            {this.state.topList.map(
                                                (item: any, index) => {
                                                    return (
                                                        <Option
                                                            value={
                                                                item.subject_text
                                                            }
                                                            key={index}>
                                                            {item.subject_text}
                                                        </Option>
                                                    )
                                                }
                                            )}
                                        </OptGroup>
                                    </Select>
                                </div>
                                <div style={{ fontSize: '13px' }}>
                                    <div style={{ margin: '20px 0 10px 0' }}>
                                        <b>请选择题目类型</b>:
                                    </div>
                                    <Select
                                        defaultValue={item.questions_type_text}
                                        style={{ width: 200 }}>
                                        <OptGroup label="">
                                            {this.state.titleType.map(
                                                (item: any, index) => {
                                                    return (
                                                        <Option
                                                            value={
                                                                item.questions_type_text
                                                            }
                                                            key={index}>
                                                            {
                                                                item.questions_type_text
                                                            }
                                                        </Option>
                                                    )
                                                }
                                            )}
                                        </OptGroup>
                                    </Select>
                                </div>
                                <div
                                    style={{
                                        fontSize: '15px',
                                        margin: '25px 0 10px 0'
                                    }}>
                                    答案信息
                                </div>
                                <div className="for-content">
                                    <Editor
                                        value={item.questions_answer}></Editor>
                                </div>
                                <div style={{ margin: '20px 0 0px 0' }}>
                                    <Button
                                        style={{
                                            background: '#0139FD',
                                            color: '#fff'
                                        }}
                                        onClick={this.showConfirm.bind(
                                            this,
                                            updateList
                                        )}>
                                        提交
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )
                })}
            </div>
        )
    }
}

export default CheckTextEditor
