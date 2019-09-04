import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { inject, observer } from 'mobx-react'
import './index.css'

interface UserFormProps extends FormComponentProps {
    age: number
    name: string
    user: any
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
            }
        })
    }
    public render() {
        console.log(this.props, this.props.user.login, '.....props')
        const { getFieldDecorator } = this.props.form
        return (
            <Form
                style={{ width: 200, margin: '28px auto' }}
                onSubmit={this.handleSubmit}
                className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                message: 'Please input your username!',
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
                            placeholder="Username"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
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
                            placeholder="Password"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        block={true}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(App)
