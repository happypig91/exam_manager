import Main from '../views/main'
import Login from '../views/login'
import Add from '../views/main/add'
import Search from '../views/main/search'
import Kind from '../views/main/kind'

export default {
    routes: [
        {
            children: [
                {
                    component: Add,
                    path: '/main/addQuestion'
                },
                {
                    component: Search,
                    path: '/main/searchQuestion'
                },
                {
                    component: Kind,
                    path: '/main/kindQuestion'
                }
            ],
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
