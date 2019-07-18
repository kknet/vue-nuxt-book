const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const InitManager = require('./core/init')
const app = new Koa()
const catchError = require('./middleware/catchError')
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

InitManager.session(app)    // session
async function start() {    
    const nuxt = new Nuxt(config)
    const { host = process.env.HOST || '127.0.0.1', port = process.env.PORT || 3001 } = nuxt.options.server
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    } else {
        await nuxt.ready()
    }
    InitManager.initRouters(app)    // router
    require('./middleware/auth')(app)
    app.use(ctx => {
        ctx.status = 200
        ctx.respond = false // Bypass Koa's built-in response handling
        ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        nuxt.render(ctx.req, ctx.res)
    })
    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}

start()
