import * as React from 'react'
import { inject, observer } from 'mobx-react'
import './index.css'
const ReactMarkdown = require('react-markdown')

interface Props {
    question: any
    history: any
}

@inject('question')
@observer
class Detail extends React.Component<Props> {
    state = {
        examQuestion: []
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
        const { getQuestionExam } = this.props.question
        let resultList = await getQuestionExam()
        console.log(resultList.data)
        this.setState({
            examQuestion: resultList.data
        })
    }
    public render() {
        console.log(this.props)
        let ind = this.props.history.location.state.id
        return (
            <div>
                <div style={{ fontSize: '18px', margin: '0 0 10px 0' }}>
                    试题详情
                </div>
                {this.state.examQuestion.map((item: any, index: number) => {
                    return ind === item.questions_id ? (
                        <div key={index} className="wrapper">
                            <div className="left">
                                <h4>出题人:{item.user_name}</h4>
                                <h3>题目信息</h3>
                                <div className="antd-list-item-l-b">
                                    <div>
                                        <div className="ant-tag ant-tag-blue">
                                            {item.questions_type_text}
                                        </div>
                                        <div className="ant-tag ant-tag-geekblue">
                                            {item.subject_text}
                                        </div>
                                        <div className="ant-tag ant-tag-orange">
                                            {item.exam_name}
                                        </div>
                                    </div>
                                </div>
                                <h4>{item.title}</h4>
                                <ReactMarkdown source={item.questions_stem} />
                                <ReactMarkdown source={item.questions_answer} />
                            </div>
                            <div className="right">
                                <h3>答题信息</h3>
                                <ReactMarkdown source={item.questions_answer} />
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

export default Detail
