import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

interface PropsInfo {
	routes: Array<object>
}


const RouterView = (props:PropsInfo) => {

	return <Switch>
			{props.routes.map((item:any, index:number) => {
					return item.path?<Route key={index} path={item.path} render={(props)=>{
							return item.children&&item.children.length?<item.component {...props}>
									<RouterView routes={item.children}/>
							</item.component>:<item.component {...props}></item.component>
					}}></Route>:<Redirect key={item.from} {...item}></Redirect>
			})}
	</Switch>
}

export default RouterView
