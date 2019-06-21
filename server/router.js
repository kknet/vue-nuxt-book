const homeBooks = require('./controller/api/book') 
const users = require('./controller/api/user') //用户登录注册接口
const router = (app) => {
    app.use(users.routes()).use(users.allowedMethods())
    app.use(homeBooks.routes()).use(homeBooks.allowedMethods())
}


module.exports = router