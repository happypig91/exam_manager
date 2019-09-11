//获取到登录态
import { getToken } from './index'
//获取到仓库
import store from '../store/index'


//封装路由守卫
function guard(history: any) {
  
  beforeEach(history);
  const unListen = history.listen((location: object) => {
    console.log(location);
    beforeEach(history)
  })
  console.log(unListen)
}
function beforeEach(history: any) {
  if (getToken()) {
    const userInfo: any = store.user.userInfo;
    if (!Object.keys(userInfo).length) {
      store.user.getUserInfoUser();
    }
  } else {
    // 去登陆页面
    history.replace('/login');
  }
}

export function filterView(originRoutes: object[], viewAutority: object[]): object[] {
  // const routes = JSON.parse(JSON.stringify(originRoutes));
  const routes = originRoutes;

  return routes.filter((item: any) => {
    let value = Object.assign({}, item);
    if (value.children) {
      value.children = filterView(value.children, viewAutority);
    }
    if (value.view_id) {
      return viewAutority.findIndex((result: any) => value.view_id === result.view_id) !== -1
    } else {
      return true;
    }
  })
}

export default guard