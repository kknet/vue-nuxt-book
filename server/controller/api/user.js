const Router = require('koa-router')
const router = new Router({ prefix: '/api' }) // 接口前缀、
const CryptoJS = require('crypto-js')
const User = require('../../model/user')
const axios = require('axios')
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
        ctx.session.userInfo = {
            username
        }
        ctx.body = {
            code: 10000,
            msg: '注册成功',
        }
    } catch (error) {
        ctx.body = {
            code: -1,
            msg: '注册失败',
            data: error
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
        if (ctx.session && ctx.session.userInfo) {
            ctx.session.userInfo = null
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


router.get('/users', async ctx => {
    const code = ctx.query.code
    const data = await axios({
        method: 'POST',
        url: 'https://github.com/login/oauth/access_token',
        data: {
            client_id: 'cc6571de853ab8c8f717',
            client_secret: '954a51ad022cea5f2db05823390893adf65083da',  
            code,
        },
        headers: {
            Accept: 'application/json',
        },
    })
    if (data.status == 200 && (data.data && !data.error)) {
        const userInfo = await axios.get(`https://api.github.com/user?access_token=${data.data.access_token}`)
        
        const user = await User.findOne({ id: userInfo.data.id })
        if (!user) {    // 用户不存在
            let nuser = new User({
                username: userInfo.data.login,
                id: userInfo.data.id,
                avatar: userInfo.data.avatar_url
            })
            await nuser.save()
            ctx.session.userName = userInfo.data.login
            console.log(ctx.session.userName);
            
            
            ctx.body = {
                code: 10000,
                msg: '登录成功',
            }
        }
        // 存入数据库
    } else {
        console.log('错误');
    }

})
module.exports = router