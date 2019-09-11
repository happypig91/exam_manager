##  生成脚手架
```js
create-react-app my-app --scripts-version=react-scripts-ts
```

##  安装依赖包
```js
cd <project></project>
cnpm i || yarn install
```

##  tslint配置
```js
    //用于console.Log的配置
  "rules": {
    "no-console": [
      false
    ],
    "only-arrow-functions": [
      false
    ],
    defaultServerity:none,//可以不按照顺序排序
    "no-empty":true,//不允许空的块
    "ordered-imports":false //引入多个对象至模块时不用按顺序排序
  },
```
## tsconfigjson配置
```js
"noImplicitAny": false 
```
## typeScripts


### tslint.json

配置 | 描述 | 默认值
---|--- |---
defaultSeverity | 设置默认为warning(警告)  | error
interface-name | 默认ts接口为大写I开头,在这里可以配置一下 | boolean值
no-console     | 默认ts是不允许console.log的   | boolean值
jsx-self-colse | 默认如果为空如果是双标签就会报错 |boolean值
jsx-no-lambda  | 默认不允许有匿名函数           | boolean值
object-literal-sort-keys| 默认是需要按字母排序的 |boolean值
member-access  | 类成员必须声明 private public  | boolean值
ordered-imports | 引入多个组件也需要排序需配置  | boolean值

tslint.json
```js
    {
      "defaultSeverity": "warning",
      "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
      "linterOptions": {
        "exclude": [
          "config/**/*.js",
          "node_modules/**/*.ts",
          "coverage/lcov-report/*.js"
        ]
      },
      "rules": {
        "interface-name": [true, "never-prefix"],
        "no-console": false,
        "jsx-self-close": false,
        "jsx-no-lambda": false,
        "object-literal-sort-keys": false,
        "member-access": false,
        "ordered-imports": [
          false,
          {
              "import-sources-order": "lowercase-last",
              "named-imports-order": "lowercase-first"
          }
        ]
      }
    }
```


###  tsconfig.json


配置 | 描述 | 默认值
---|--- |---
emitDecoratorMetadata | 给源码里的装饰器声明加上设计类型元数据 | false
experimentalDecorators | 启用实验性的ES装饰器   | false
noUnusedLocals  |  若有未使用的参数则报错  | false


## mobx
- 首先下载对应的依赖包
```js
cnpm i --save mobx mobx-react
```
- 新建对应的store仓库
```js
//建议尽量进行模块的分离
//modules 文件夹下新建文件 例如为 user.ts
import {observable,action} from 'mobx'

class User {
    //ts文件必须定义变量的类型 
    //这个会被挂载到props上面
    @observable isLogin:boolean=false;
    
    //因为async返回的是promise函数 所以需要对函数进行变量的定义
    @action async login(): Promise<any>{
        let result = await ‘api接口名称’
    }
}

export default User

//index.ts
//引入对应的子模块  可以引入多个
import User from './modules/user'

//实例化模块
const user = new User()

//抛出实例后的模块
export default {
    user
}
```
- 在主页面进行仓库的引入以及应用
```js
// 引入mobx实例
import {Provider} from 'mobx-react';
import store from './store'

ReactDOM.render(
  <Provider {...store}>
    '路由页面'
  </Provider>,
  document.getElementById('root') as HTMLElement
);

```

- 在使用仓库的页面进行引入
```js
import {inject, observer} from 'mobx-react'

//把仓库对应的user这个模块的数据挂载到this.props上面
@inject('user')
//observer 函数/装饰器可以用来将 React 组件转变成响应式组件
//为了当你仓库内的值发生改变时你的页面也可以进行同步更新
@observer

```

###  报错信息

non-arrow functions are forbidden   尽量使用箭头函数来表示



	<SubMenu
							key="sub1"
							title={
								<span>
									<Icon type="user" />
									试卷管理
                                </span>
							}>
							<Menu.Item key="1">
								<NavLink to="/home/addlist">添加试题</NavLink>
							</Menu.Item>
							<Menu.Item key="2">
								<NavLink to="/home/textQuestion">
									试题分类
                                </NavLink>
							</Menu.Item>
							<Menu.Item key="3">
								<NavLink to="/home/checkTextQuestion">
									查看试题
                                </NavLink>
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub2"
							title={
								<span>
									<Icon type="laptop" />
									用户管理
                                </span>
							}>
							<Menu.Item key="5">
								<NavLink to="/home/adduser">添加用户</NavLink>
							</Menu.Item>
							<Menu.Item key="6">
								<NavLink to="/home/usershow">用户展示</NavLink>
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub3"
							title={
								<span>
									<Icon type="notification" />
									考试管理
                                </span>
							}>
							<Menu.Item key="9">
								<NavLink to="/home/examManage">
									添加考试
                                </NavLink>
							</Menu.Item>
							<Menu.Item key="10">
								<NavLink to="/home/questionList">
									试卷列表
                                </NavLink>
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub4"
							title={
								<span>
									<Icon type="cloud-o" />
									班级管理
                                </span>
							}>
							<Menu.Item key="11">
								<NavLink to="/home/classManger">
									班级管理
                                </NavLink>
							</Menu.Item>
							<Menu.Item key="13">
								<NavLink to="/home/studentManger">
									学生管理
                                </NavLink>
							</Menu.Item>
							<Menu.Item key="12">
								<NavLink to="/home/classRoomer">
									教室管理
                                </NavLink>
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub5"
							title={
								<span>
									<Icon type="appstore-o" />
									阅卷管理
                                </span>
							}>
							<Menu.Item key="14">
								<NavLink to="/home/waitClass">待批班级</NavLink>
							</Menu.Item>
						</SubMenu>