import request from '../utils/request'

export let search = (params: any) => {
    return request.get('/exam/subject', params)
}
