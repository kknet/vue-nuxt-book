export default function ({ isHMR, route, redirect }) {
    if (route.fullPath == '/') {
        return redirect('/index')
    }
}