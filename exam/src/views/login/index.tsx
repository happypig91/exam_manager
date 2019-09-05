import * as React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { inject, observer } from 'mobx-react'
import './index.css'

interface UserFormProps extends FormComponentProps {
    age: number
    name: string
    user: any
    history: any
}

@inject('user')
@observer
class App extends React.Component<UserFormProps, any> {
    public handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        this.props.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                const result = await this.props.user.login(values)
                console.log(result, '....result')
                if (result.code === 1) {
                    console.log(this.props)

                    message.success(result.msg, 1, () => {
                        this.props.history.replace('/main')
                    })
                } else {
                    message.error(result.msg || '用户名或密码有误', 1)
                }
            }
        })
    }
    public render() {
        // console.log(this.props, this.props.user.login, '.....props')
        const { getFieldDecorator } = this.props.form
        return (
            <div className="wrapper">
                <div className="login-wrapper">
                    <Form
                        style={{ width: 300, margin: '10px auto' }}
                        onSubmit={this.handleSubmit}
                        className="login-form">
                        <Form.Item>
                            {getFieldDecorator('user_name', {
                                rules: [
                                    {
                                        message: 'Please input your user_name!',
                                        required: true
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    placeholder="User_name"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('user_pwd', {
                                rules: [
                                    {
                                        message: 'Please input your Password!',
                                        required: true
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: 'rgba(0,0,0,.25)' }}
                                        />
                                    }
                                    type="password"
                                    placeholder="user_pwd"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                initialValue: true,
                                valuePropName: 'checked'
                            })(<Checkbox>记住密码</Checkbox>)}
                            {getFieldDecorator('autoLogin', {
                                initialValue: true,
                                valuePropName: 'checked'
                            })(<Checkbox>免七天登录</Checkbox>)}
                            <a
                                className="login-form-forgot"
                                style={{ marginLeft: '10%' }}
                                href="">
                                忘记密码
                            </a>
                            <Button
                                block={true}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button">
                                登录
                            </Button>
                            Or <a href="">注册</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Form.create()(App)
