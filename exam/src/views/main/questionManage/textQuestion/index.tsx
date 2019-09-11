import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Table, Modal, Input, message } from 'antd'

interface Props {
    question: any
    data: any
    questions_type_id: any
    questions_type_text: any
}

@inject('question')
@observer
class TextQuestion extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }
    state = {
        data: [],
        modal1Visible: false,
        modal2Visible: false,
        typeData: '',
        sort: ''
    }

    setModal1Visible(modal1Visible: any) {
        this.setState({ modal1Visible })
    }
    //获取添加试卷分类的值
    handChange = (e: any) => {
        let { value } = e.target
        this.setState({
            typeData: value
        })
    }
    //更改显示框的隐藏和显示状态
    setModal2Visible(modal2Visible: any) {
        this.setState({
            modal2Visible: modal2Visible.show
        })
        if (modal2Visible.key === '确认') {
            this.AddGetType()
            this.setState({
                typeData: ''
            })
        }
    }
    //调用mobx 发起axios请求
    AddGetType = async () => {
        let { getAddExamType } = this.props.question
        console.log(this.state.typeData)
        let result = await getAddExamType({
            text: this.state.typeData,
            sort: this.state.sort + ''
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
        const { getQuestionsType } = this.props.question
        let result = await getQuestionsType()
        this.setState({
            data: result.data,
            sort: result.data.length + 1
        })
    }

    public render() {
        const columns = [
            {
                title: '类型ID',
                dataIndex: 'ID'
            },
            {
                title: '类型名称',
                dataIndex: 'name'
            },
            {
                title: '操作',
                dataIndex: 'caozuo'
            }
        ]
        const data = this.state.data.map((item: any, index) => {
            return {
                key: index,
                ID: item.questions_type_id,
                name: item.questions_type_text,
                caozuo: ''
            }
        })
        let { typeData } = this.state
        return (
            <div>
                <h1 style={{ fontSize: '18px', margin: '0 0 10px 0' }}>
                    试卷分类
                </h1>
                <div className="content">
                    <div style={{ marginBottom: '10px' }}>
                        <Button
                            type="primary"
                            style={{ padding: '0 40px', fontWeight: 'bold' }}
                            onClick={() =>
                                this.setModal2Visible({
                                    show: true,
                                    key: '添加'
                                })
                            }>
                            +添加按钮
                        </Button>
                        <Modal
                            title="创建新类型"
                            centered
                            okText="确认"
                            cancelText="取消"
                            visible={this.state.modal2Visible}
                            onOk={() =>
                                this.setModal2Visible({
                                    show: false,
                                    key: '确认'
                                })
                            }
                            onCancel={() =>
                                this.setModal2Visible({
                                    show: false,
                                    key: '取消'
                                })
                            }>
                            <Input
                                style={{
                                    border: 'none',
                                    borderBottom: '1px solid #ccc',
                                    outline: 'none'
                                }}
                                size="large"
                                placeholder="请输入类型名称"
                                value={typeData}
                                onChange={this.handChange}
                            />
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

export default TextQuestion
