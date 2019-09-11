import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Select, Button } from 'antd'
const { Option } = Select
interface Props {
    classmanger: any
    examManger: any
}

@inject('classmanger', 'examManger')
@observer
class ExamDetail extends React.Component<Props> {
    state = {
        data: [],
        grade_id: '',
        grade_name: '',
        datas: [],
        examStudent: [],
        status: ['未阅', '已阅'],
        columns: [
            {
                title: '班级',
                dataIndex: 'classroom'
            },
            {
                title: '姓名',
                dataIndex: 'name'
            },
            {
                title: '阅卷状态',
                dataIndex: 'statues'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '成才率',
                dataIndex: 'successes'
            },
            {
                title: '操作',
                dataIndex: 'options',
                render: (text: any, record: any) => (
                    <span>
                        <a>批卷</a>
                    </span>
                )
            }
        ]
    }
    examDetail(text: any) {
        console.log(text, this.props)
    }
    searchStudent = () => {
        const dataes = this.state.examStudent.map((item: any, index) => {
            if (this.state.grade_id === item.grade_id) {
                return {
                    classroom: this.state.grade_name,
                    name: item.student_name,
                    statues: item.status === 0 ? '未判' : '已判',
                    start_time: item.start_time,
                    end_time: item.end_time,
                    successes: '-',
                    key: index
                }
            } else {
                return ''
            }
        })
        this.setState({
            dataes: dataes
        })
    }
    componentDidMount() {
        this.getList()
    }
    getList = async () => {
        const { getClassManger } = this.props.classmanger
        const { examStudentList } = this.props.examManger
        let result = await getClassManger()
        let results = await examStudentList()
        this.setState({
            data: result.data,
            examStudent: results.exam
        })
    }
    handleChange = (value: any) => {
        console.log(value)
    }
    handleChanges = (value: any) => {
        return this.setState({
            grade_id: value
        })
    }
    public render() {
        const data = this.state.datas

        return (
            <div>
                <label style={{ margin: '10px 30px 20px 5px' }}>
                    <span>状态</span>
                    <Select
                        defaultValue=""
                        onChange={this.handleChange}
                        style={{ width: 200 }}>
                        {this.state.status.map((item: any, index: any) => {
                            return <Option key={index}>{item}</Option>
                        })}
                    </Select>
                </label>
                <label style={{ margin: '10px 30px 20px 5px' }}>
                    <span>班级</span>
                    <Select
                        defaultValue=""
                        onChange={this.handleChanges}
                        style={{ width: 200 }}>
                        {this.state.data.map((item: any) => {
                            return (
                                <Option
                                    key={item.grade_id}
                                    value={item.grade_id}>
                                    {item.grade_name}
                                </Option>
                            )
                        })}
                    </Select>
                </label>
                <label>
                    <Button
                        type="primary"
                        icon="search"
                        onClick={this.searchStudent}>
                        查询
                    </Button>
                </label>
                <Table
                    style={{ margin: '30px 0 0 0' }}
                    columns={this.state.columns}
                    dataSource={data}
                    size="middle"
                />
            </div>
        )
    }
}

export default ExamDetail
