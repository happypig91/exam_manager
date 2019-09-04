import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

interface PropsInfo {
    routes: any
}

export default (prop: PropsInfo) => {
    return (
        <Switch>
            {prop.routes.map((item: any, index: number) => {
                return item.component ? (
                    <Route
                        key={index}
                        path={item.path}
                        render={props => {
                            if (item.children) {
                                return (
                                    <item.component
                                        {...props}
                                        routes={item.children}
                                    />
                                )
                            } else {
                                return <item.component {...props} />
                            }
                        }}
                    />
                ) : (
                    <Redirect key={index} from={item.path} to={item.redirect} />
                )
            })}
        </Switch>
    )
}
