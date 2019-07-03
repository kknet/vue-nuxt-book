const User = require('../model/user')
const axios = require('axios')

module.exports = app => {
    app.use(async (ctx, next) => {
        if (ctx.path !== '/myBook') {
            await next()
            return
        }
        const code = ctx.query.code
        if (!code) {
            await next()
            return
        }
        const env = process.env.NODE_ENV === "production"
        const data = await axios({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token',
            data: {
                client_id: env ? 'd206e28818669ecf8e6c' : 'cc6571de853ab8c8f717',
                client_secret: env ? '5c0ac02771adc39bc83c0b04dedc9546547e77b6' : '954a51ad022cea5f2db05823390893adf65083da',
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
                ctx.session.userInfo = {
                    userName: userInfo.data.login,
                    avatar: userInfo.data.avatar_url,
                    id: userInfo.data.id,
                }
                ctx.redirect('/myBook')
            } else {// 用户已存在
                ctx.session.userInfo = {
                    userName: user.username,
                    avatar: user.avatar,
                    id: user.id,
                }
                ctx.redirect('/myBook')
            }
        } else {
            console.log('github client_id错误');

        }

    })

}