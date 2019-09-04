import Main from '../views/main'
import Login from '../views/login'

export default {
    routes: [
        {
            component: Main,
            path: '/main'
        },
        {
            component: Login,
            path: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
}
