import axios from 'axios'

export function Login(params) {
    const url = ' http://localhost:3000/user/login'
    return axios.post(url, params)
}
