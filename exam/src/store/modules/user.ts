import { observable, action } from 'mobx'
import { login } from '../../service/index'
import { LoginForm } from '../../types/index'
import { setToken, removeToken } from '../../utils'

// 获取本地用户信息
let account = {}

if (window.localStorage.getItem('account')) {
    account = JSON.parse(window.localStorage.getItem('account') + '')
}

class User {
    @observable public isLogin: boolean = false
    @observable public account: any = account
    @action public async login(from: LoginForm): Promise<any> {
        const result: any = await login(from)
        console.log(result, '...result')
        // 记住用户密码
        if (from.remember) {
            window.localStorage.setItem('account', JSON.stringify(from))
        }
        // 免7天登录
        if (from.autoLogin) {
            setToken(result.token)
        }
        return result
    }

    // 退出登录
    @action public async logout(): Promise<any> {
        removeToken()
    }
}

export default User
