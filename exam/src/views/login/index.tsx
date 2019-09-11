import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import * as React from 'react';
import '../../asscpt/login/index.css';
import { inject, observer } from 'mobx-react';

/**
 * 定义history的值的类型
 */
interface PropsInfo {
	form: WrappedFormUtils;
	history: any;
	user: any;
}
@inject('user')
// observer 函数/装饰器可以用来将 React 组件转变成响应式组件
@observer
class Login extends React.Component<PropsInfo> {
	handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
                console.log(values)
                const result = await this.props.user.login(values);
                console.log(result)
				if (result.code === 1) {
					message.success(result.msg);
					this.props.history.push('/home');
				} else {
					message.error(result.msg);
				}
			}
		});
	};
	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className='login-page'>
				<div className='login'>
					<Form onSubmit={this.handleSubmit} className='login-form'>
						<Form.Item>
							{getFieldDecorator('user_name', {
								validateTrigger: 'onBlur',
								rules: [
									{
										validator: (ruler, value, callback) => {
											console.log('value...', value);
											if (/[a-z]{5,20}/.test(value)) {
												callback();
											} else {
												callback(
													'Please input valid username!'
												);
											}
										}
									}
								]
							})(
								<Input
									prefix={
										<Icon
											type='user'
											style={{ color: 'rgba(0,0,0,.25)' }}
										/>
									}
									placeholder='Username'
								/>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('user_pwd', {
								validateTrigger: 'onBlur',
								rules: [
									{
										validator: (ruler, value, callback) => {
											console.log('value...', value);
											if (
												/^(?![a-z]+$)(?![A-Z]+$)(?!([^(a-zA-Z\!\*\.\#)])+$)^.{8,16}$/.test(
													value
												)
											) {
												callback();
											} else {
												callback(
													'Please input valid password!'
												);
											}
										}
									}
								]
							})(
								<Input
									prefix={
										<Icon
											type='lock'
											style={{ color: 'rgba(0,0,0,.25)' }}
										/>
									}
									type='password'
									placeholder='Password'
								/>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true
							})(<Checkbox>Remember me</Checkbox>)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('autoLogin', {
								valuePropName: 'checked',
								initialValue: true
							})(<Checkbox>Auto login in 7 days</Checkbox>)}
							<a className='login-form-forgot' href=''>
								Forgot password
							</a>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'>
								Log in
							</Button>
							Or <a href=''>register now!</a>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}
}

export default Form.create()(Login);
