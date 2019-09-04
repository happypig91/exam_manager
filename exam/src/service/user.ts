import request from '../utils/request'

export let login = (params: object) => {
    return request.post('/user/login', params)
}
