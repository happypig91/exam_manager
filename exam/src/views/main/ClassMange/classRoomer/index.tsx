import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Table, Button, Modal, Form, Input, message } from 'antd'
interface Props {
    age: number
    name: string
    classmanger: any
    data: any
    question: any
    form: any
}

@inject('classmanger', 'question')
@observer
class ClassRoomer extends React.Component<Props> {
    state = {
        classroom: [],
        visible: false,
        classes: ''
    }

    deleteClicks = async (text: any) => {
        const { room_id } = this.state.classroom[text.key]
        // console.log(room_id)
        let { getDeleteClasses } = this.props.classmanger
        let resulte = await getDeleteClasses({
            room_id: room_id
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
            classes: e.target.value
        })
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }

    hideModal = () => {
        this.AddClasses()
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

    //调用mobx 发起axios请求 添加班级接口
    AddClasses = async () => {
        let { getAddClasses } = this.props.classmanger
        let result = await getAddClasses({
            room_text: this.state.classes
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

    getList = async () => {
        const { getClasses } = this.props.classmanger
        let results = await getClasses()
        this.setState({
            classroom: results.data
        })
    }
    public render() {
        const { getFieldDecorator } = this.props.form
        const columns = [
            {
                title: '教室号',
                dataIndex: 'classes'
            },
            {
                title: '',
                dataIndex: ''
            },
            {
                title: '',
                dataIndex: ''
            },
            {
                title: 'option',
                key: 'action',
                render: (text: any, record: any) => (
                    <span>
                        <a onClick={this.deleteClicks.bind(this, text)}>删除</a>
                    </span>
                )
            }
        ]
        const data = this.state.classroom.map((item: any, index) => {
            return {
                key: index,
                classes: item.room_text
            }
        })
        return (
            <div>
                <h1 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>
                    教室管理
                </h1>
                <div className="content">
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={this.showModal}>
                            +添加教室
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
                                <Form.Item label="教室名">
                                    {getFieldDecorator('classes', {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    'Please input your classes!'
                                            }
                                        ]
                                    })(
                                        <Input
                                            placeholder="教室名"
                                            onChange={this.handChange}
                                        />
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
export default Form.create()(ClassRoomer)
