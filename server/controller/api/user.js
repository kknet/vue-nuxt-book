const Router = require('koa-router')
const router = new Router({ prefix: '/api' }) // 接口前缀、
const CryptoJS = require('crypto-js')
const User = require('../../model/user')
router.post('/register', async ctx => {
    try {
        let { username, password } = ctx.request.body
        if (!username || !password) {
            return ctx.body = {
                code: -1,
                msg: '请填写正确的用户名和密码'
            }
        }
        password = CryptoJS.MD5(password).toString()
        const user = await User.findOne({ username })
        if (user) {
            return ctx.body = {
                code: -1,
                msg: '用户名已被注册'
            }
        }
        let nuser = new User({
            password,
            username
        })
        await nuser.save()
        ctx.session.userName = username
        ctx.body = {
            code: 10000,
            msg: '注册成功',
        }

    } catch (error) {
        ctx.body = {
            code: -1,
            msg: '注册失败',
            data:error
        }
    }
})


// 登录
router.post('/login', async ctx => {
    try {
        const { username, password } = ctx.request.body
        if (!username || !password) {
            return ctx.body = {
                code: -1,
                msg: '请输入用户名和密码'
            }
        }
        const res = await User.findOne({ username })
        if (!res) {
            return ctx.body = {
                code: -1,
                msg: '用户名不存在'
            }
        }

        if (res.password !== CryptoJS.MD5(password).toString()) {
            return ctx.body = {
                code: -1,
                msg: '密码错误'
            }
        }
        const user = await User.findOne({ username: res.username })
        ctx.session.userName = user.username
        ctx.body = {
            code: 10000,
            msg: '登录成功',
        }
    } catch (error) {
        return ctx.body = {
            code: -1,
            msg: '登录失败'
        }
    }
})

// 退出登录
router.post('/loginOut', async ctx => {
    try {
        if (ctx.session && ctx.session.userName) {
            ctx.session.userName = null
            ctx.body = {
                code: 10000,
                msg: '退出登录成功'
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '操作失败'
            }
        }
    } catch (error) {
        ctx.body = {
            code: -1,
            msg: '操作失败'
        }
    }
})
module.exports = router