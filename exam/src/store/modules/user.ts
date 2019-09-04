import { observable, action } from 'mobx'
import { login } from '../../service/index'
import {HtppInfo,HttpType,LoginForm} from '../../types/index'

class User {
    @observable public isLogin: boolean = false
    @action public async login(from: LoginForm): Promise<any> {
        let result: any = await login(from)
        console.log(result, '...result')
        return result.code
    }
}

export default User
