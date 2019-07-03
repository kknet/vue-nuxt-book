
export default async function ({ router,route, redirect, store, $axios }) {

    if (route.fullPath == '/') {
        return redirect('/index')
    }

    if (route.name === 'register' || route.name === 'login') {
        if (store.state.userInfo.userName) {
            return redirect('/index')
        }
    }

    // github登录
    if (route.name === 'myBook') {
        if (route.query.code) {
            // const data = await $axios.$get('/api/users', { params: { code: route.query.code } })
            // if (data.code == 10000 ) {
            //     // return redirect('/myBook')
            // }
        }
    }
}