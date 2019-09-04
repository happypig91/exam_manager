import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import RouterView from './routers/RouterView'
import routes from './routers/routes'
import 'antd/dist/antd.css'
import { Provider } from 'mobx-react'
import store from './store'

ReactDOM.render(
    <Provider {...store}>
        <BrowserRouter>
            <RouterView routes={routes.routes} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
)
registerServiceWorker()
