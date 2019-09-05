import request from '../utils/request'

export let type = (params: any) => {
    return request.get('/exam/examType', params)
}
