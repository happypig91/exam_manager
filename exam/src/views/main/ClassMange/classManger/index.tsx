import * as React from 'react'
import { inject, observer } from 'mobx-react'
import {
    Table,
    Divider,
    Button,
    Modal,
    Form,
    Select,
    Input,
    message
} from 'antd'
const { Option } = Select
interface Props {
    age: number
    name: string
    classmanger: any
    data: any
    question: any
    form: any,
}

@inject('classmanger', 'question')
@observer
class ClassManger extends React.Component<Props> {
    state = {
        data: [],
        classroom: [],
        subject: [],
        subject_id: '',
        room_id: '',
        visible: false,
        class: '',
        classes: '',
        project: '',
        grade_id: '',
        grade_name: '',
        disabled: false
    }

    updataClicks = async (text: any) => {
        this.props.form.setFieldsValue({
            class: text.class,
            classes: text.classes,
            project: text.project
        })
        this.showModal()
        this.setState({
            disabled: true
        })
        const { grade_id, grade_name } = this.state.data[text.key]
        this.setState({
            grade_id: grade_id,
            grade_name: grade_name
        })
        let { getUpdateClass } = this.props.classmanger
        let resultes = await getUpdateClass({
            grade_id: grade_id,
            grade_name: grade_name,
            subject_id: this.state.subject_id,
            room_id: this.state.room_id
        })
        if (resultes.code === 1) {
            message.success(resultes.msg)
        }
    }
    deleteClicks = (index: any) => {
        let {grade_id} = this.state.data[index]
        this.setState({
            grade_id
        },()=>{
            this.DeleteClass()
        })
    }
    DeleteClass = async () => {
        let { getDeleteClass } = this.props.classmanger
        let resulte = await getDeleteClass({
            grade_id: this.state.grade_id
        })
        if (resulte.code === 1) {
            //添加成功后重新渲染数据
            message.success(resulte.msg)
        } else {
            message.error(resulte.msg)
        }
        this.getList()
    }
    handChange = (e: any) => {
        this.setState({
            class: e.target.value
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
            disabled: false
        })
    }

    hideModal = () => {
        this.AddClass()
        this.setState({
            visible: false
        })
    }

    handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    handleSelectChange = (value: any) => {
        this.state.subject.map((item: any) => {
            if (value === item.subject_text) {
                return this.setState({
                    project: value,
                    subject_id: item.subject_id
                })
            }
        })
    }

    handleSelectChanges = (value: any) => {
        this.state.classroom.map((item: any) => {
            if (value === item.room_text) {
                return this.setState({
                    classes: value,
                    room_id: item.room_id
                })
            }
        })
    }

    //调用mobx 发起axios请求 添加班级接口
    AddClass = async () => {
        let { getAddClass } = this.props.classmanger
        let result = await getAddClass({
            grade_name: this.state.class,
            subject_id: this.state.subject_id,
            room_id: this.state.room_id
        })
        if (result.code === 1) {
            //添加成功后重新渲染数据
            message.success(result.msg)
        } else {
            message.error(result.msg)
        }
        this.getList()
    }
    componentDidMount() {
        this.getList()
    }

   

    UpdateClass = async () => {
        let { getUpdateClass } = this.props.classmanger
        let resultes = await getUpdateClass({
            grade_id: this.state.grade_id,
            grade_name: this.state.class,
            subject_id: this.state.subject_id,
            room_id: this.state.room_id
        })
        if (resultes.code === 1) {
            //添加成功后重新渲染数据
            message.success(resultes.msg)
            // console.log(resultes.msg)
        } else {
            message.error(resultes.msg)
            // console.log(resultes.msg)
        }
        this.getList()
    }

    getList = async () => {
        const { getClassManger, getClasses } = this.props.classmanger
        const { getQuestionSubject } = this.props.question
        let result = await getClassManger()
        let projects = await getQuestionSubject()
        let results = await getClasses()
        this.setState({
            classroom: results.data,
            subject: projects.data,
            data: result.data
        })
    }
    public render() {
        const { getFieldDecorator } = this.props.form
        const columns = [
            {
                title: '班级名',
                dataIndex: 'class'
            },
            {
                title: '课程名',
                dataIndex: 'project'
            },
            {
                title: '教室号',
                dataIndex: 'classes'
            },
            {
                title: 'option',
                key: 'action',
                render: (text: any, record: any) => (
                    <span>
                        <a onClick={this.updataClicks.bind(this, text)}>修改</a>
                        <Divider type="vertical" />
                        <a onClick={this.deleteClicks.bind(this, record.key)}>删除</a>
                    </span>
                )
            }
        ]
        const data =
            this.state.data &&
            this.state.data.map((item: any, index) => {
                return {
                    key: index,
                    class: item.grade_name,
                    project: item.subject_text,
                    classes: item.room_text
                }
            })
        return (
            <div>
                <h1 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>
                    班级管理
                </h1>
                <div className="content">
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={this.showModal}>
                            +添加班级
                        </Button>
                        <Modal
                            title="创建班级"
                            visible={this.state.visible}
                            onOk={this.hideModal}
                            onCancel={this.hideModal}
                            okText="确认"
                            cancelText="取消">
                            <Form
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 12 }}
                                onSubmit={this.handleSubmit}>
                                <Form.Item label="班级名">
                                    {getFieldDecorator('class', {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    'Please input your classname!'
                                            }
                                        ]
                                    })(
                                        <Input
                                            disabled={this.state.disabled}
                                            placeholder="班级名"
                                            onChange={this.handChange}
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label="教室号">
                                    {getFieldDecorator('classes', {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    'Please select your classes!'
                                            }
                                        ]
                                    })(
                                        <Select
                                            placeholder="请选择你的教室号"
                                            onChange={this.handleSelectChanges}>
                                            {this.state.classroom &&
                                                this.state.classroom.map(
                                                    (
                                                        item: any,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <Option
                                                                value={
                                                                    item.room_text
                                                                }
                                                                key={index}>
                                                                {item.room_text}
                                                            </Option>
                                                        )
                                                    }
                                                )}
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label="课程名">
                                    {getFieldDecorator('project', {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    'Please select your project!'
                                            }
                                        ]
                                    })(
                                        <Select
                                            placeholder="请选择你的课程名"
                                            onChange={this.handleSelectChange}>
                                            {this.state.subject &&
                                                this.state.subject.map(
                                                    (
                                                        item: any,
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <Option
                                                                value={
                                                                    item.subject_text
                                                                }
                                                                key={index}>
                                                                {
                                                                    item.subject_text
                                                                }
                                                            </Option>
                                                        )
                                                    }
                                                )}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <div style={{ backgroundColor: '#fff' }}>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Form.create()(ClassManger)
