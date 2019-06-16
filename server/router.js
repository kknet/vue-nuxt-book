const homeBooks = require('./controller/api/book') 
const router = (app) => {
    app.use(homeBooks.routes()).use(homeBooks.allowedMethods())
}


module.exports = router