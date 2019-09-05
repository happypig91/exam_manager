import request from '../utils/request'

export let examtype = (params: any) => {
    return request.get('/exam/getQuestionsType', params)
}
