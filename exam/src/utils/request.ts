import axios from 'axios'
import { AxiosResponse } from 'axios/index'
import { getToken } from '../utils'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    headers: { authorization: getToken('token') },
    timeout: 1000
})

instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance
