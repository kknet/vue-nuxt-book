
export default async function ({ app,route, redirect, store, $axios }) {
    // 错误页面处理
    // const routers = app.router.options.routes.map(item => item.name)
    // console.log(routers);
    // console.log(route);

    // if (!route.name) {
    //     return redirect('/index')
    // }
    // if (route.name.includes('id') && !route.params.id) {
    //     return redirect('/index')
    // }

    
    if (route.fullPath == '/') {
        return redirect('/index')
    }

    if (route.name === 'register' || route.name === 'login') {
        if (store.state.userInfo.userName) {
            return redirect('/index')
        }
    }

}