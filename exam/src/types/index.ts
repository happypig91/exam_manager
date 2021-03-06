export interface LoginForm {
    autoLogin: any;
    remember: any;
    user_name: string
    user_pwd: string
}

export interface HttpType {
    object: any
    Array: any
}

export interface HttpInfo {
    code: number
    message: string
    data?: HttpType
}
