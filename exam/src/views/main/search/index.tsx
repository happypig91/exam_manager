import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Select, Button } from 'antd'
const { Option, OptGroup } = Select

interface Propsearch {
    search: any
    type: any
    examtype: any
}

@inject('search')
@inject('type')
@inject('examtype')
@observer
class Search extends React.Component<Propsearch> {
    public state = {
        examList: [],
        list: [],
        typeList: []
    }
    public render() {
        console.log(this.state.typeList)
        return (
            <div>
                <div className="row">
                    <div className="row1">课程:</div>
                    <div className="row2">
                        <div className="control">
                            <span className="child">
                                <span className="tag">All</span>
                                {this.state.list.map((item: any, index) => {
                                    return (
                                        <span className="tag" key={index}>
                                            {item.subject_text}
                                        </span>
                                    )
                                })}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="type" style={{ margin: '30px' }}>
                    <div>
                        考试类型:
                        <Select defaultValue="" style={{ width: 200 }}>
                            <OptGroup label="考试类型">
                                {this.state.typeList.map((item: any, index) => {
                                    return (
                                        <Option
                                            value={item.exam_name}
                                            key={index}>
                                            {item.exam_name}
                                        </Option>
                                    )
                                })}
                            </OptGroup>
                        </Select>
                    </div>
                </div>
                <div className="examtype" style={{ margin: '30px' }}>
                    <div>
                        题目类型:
                        <Select defaultValue="" style={{ width: 200 }}>
                            <OptGroup label="题目类型">
                                {this.state.examList.map((item: any, index) => {
                                    return (
                                        <Option
                                            value={item.questions_type_text}
                                            key={index}>
                                            {item.questions_type_text}
                                        </Option>
                                    )
                                })}
                            </OptGroup>
                        </Select>
                    </div>
                </div>
                <div className="btn" style={{ margin: '30px' }}>
                    <Button type="primary" icon="search">
                        查询
                    </Button>
                </div>
            </div>
        )
    }
    public componentDidMount() {
        const { search } = this.props.search
        const { type } = this.props.type
        const { examtype } = this.props.examtype

        search().then((resolve: any, reject: any) => {
            // console.log(resolve.data)
            this.setState({
                list: resolve.data
            })
        })
        type().then((resolve: any, reject: any) => {
            // console.log(resolve.data)
            this.setState({
                typeList: resolve.data
            })
        })
        examtype().then((resolve: any, reject: any) => {
            // console.log(resolve.data)
            this.setState({
                examList: resolve.data
            })
        })
    }
}

export default Search
