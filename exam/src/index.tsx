import * as React from 'react'
import * as ReactDOM from 'react-dom'

// 引入antd样式
import 'antd/dist/antd.css'

// 引入全局样式
import './index.css'
import store from './store/index'
import { Provider } from 'mobx-react'

import Intl from './components/Intl'

ReactDOM.render(
    <Provider {...store}>
        <Intl />
    </Provider>,
    document.getElementById('root') as HTMLElement
)
