export default function ({ route, redirect,store }) {
    if (route.fullPath == '/') {
        return redirect('/index')
    }
    
    if (route.name === 'register' || route.name === 'login') {
        if (store.state.userName) {
            return redirect('/index')
        }
    }
}