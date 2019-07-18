const requireDirectory = require('require-directory')
const Router = require('koa-router')
const session = require('koa-session');
const bodyparser = require('koa-bodyparser')
module.exports = class InitManager {
    static initCore(app) {
        InitManager.app = app
        // InitManager.initRouters(app)
        // InitManager.session(app)
    }

    // 初始化路由
    static initRouters(app) {
        const path = `${process.cwd()}/server/controller`
        requireDirectory(module, path, {
            visit: (obj) => {
                if (obj instanceof Router) {
                    app.use(obj.routes())
                }
            }
        });
    }

    static session(app) {
        app.keys = ['some secret hurr'];
        const CONFIG = {
            key: 'koa:sess',   //cookie key (default is koa:sess)
            // maxAge: 200 * 60 * 60 * 1000,  // cookie的过期时间 maxAge in ms (default is 1 days)
            overwrite: true,  //是否可以overwrite    (默认default true)
            httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
            signed: true,   //签名默认true
            rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
            renew: false,  //(boolean) renew session when session is nearly expired,
        };
        app.use(session(CONFIG, app));
        app.use(bodyparser({
            enableTypes: ['json', 'form', 'text']
        }))
    }
}