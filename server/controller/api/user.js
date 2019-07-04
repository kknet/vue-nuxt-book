const Router = require('koa-router')
const router = new Router({ prefix: '/api' }) // 接口前缀、
const CryptoJS = require('crypto-js')
const User = require('../../model/user')
const axios = require('axios')
router.post('/register', async ctx => {
    try {
        let { userName, password } = ctx.request.body
        if (!userName || !password) {
            return ctx.body = {
                code: -1,
                msg: '请填写正确的用户名和密码'
            }
        }
        password = CryptoJS.MD5(password).toString()
        const user = await User.findOne({ userName })
        if (user) {
            return ctx.body = {
                code: -1,
                msg: '用户名已被注册'
            }
        }
        let nuser = new User({
            userName,
            password,
        })
        await nuser.save()
        const user2 = await User.findOne({ userName })
        ctx.session.userInfo = user2
        
        ctx.body = {
            code: 10000,
            msg: '注册成功',
            userInfo: {
                avatar: user2.avatar,
                userName
            }
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
        const { userName, password } = ctx.request.body
        if (!userName || !password) {
            return ctx.body = {
                code: -1,
                msg: '请输入用户名和密码'
            }
        }
        const res = await User.findOne({ userName })
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
        const user = await User.findOne({ userName: res.userName })
        ctx.session.userInfo = user
        ctx.body = {
            code: 10000,
            msg: '登录成功',
            userInfo: {
                avatar: user.avatar,
                userName
            }
        }
    } catch (error) {
        return ctx.body = {
            code: -1,
            msg: '登录失败',
            userInfo:{}
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