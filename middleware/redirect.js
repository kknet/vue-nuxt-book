
export default async function ({ app, route, redirect, store, $axios }) {
    // 错误页面处理
    $axios.onError(error => {
        let err = error.response.status
        if (err && err === 404 ) {
            return redirect('/error')
        }
    })


    if (route.fullPath == '/') {
        return redirect('/index')
    }

    if (route.name === 'register' || route.name === 'login') {
        if (store.state.userInfo.userName) {
            return redirect('/index')
        }
    }

}