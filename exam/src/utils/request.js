import axios from 'axios'
import { AxiosResponse } from 'axios/index'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
})

axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance
