const GithubUserSchema = require('../model/github_user')
const axios = require('axios')
const { client_id, client_secret } = require('../../assets/js/github')
module.exports = async (ctx, next) => {
    if (ctx.path !== '/myBook') {
        await next()
        return
    }
    const code = ctx.query.code
    if (!code) {
        await next()
        return
    }
    const data = await axios({
        method: 'POST',
        url: 'https://github.com/login/oauth/access_token',
        data: {
            client_id,
            client_secret,
            code,
        },
        headers: {
            Accept: 'application/json',
        },
    })
    if (data.status == 200 && (data.data && !data.error)) {

        const userInfo = await axios.get(`https://api.github.com/user?access_token=${data.data.access_token}`)
        const user = await GithubUserSchema.findOne({ userName: userInfo.data.login })
        if (!user) {    // 用户不存在
            let nuser = new GithubUserSchema({
                userName: userInfo.data.login,
                avatar: userInfo.data.avatar_url
            })
            await nuser.save()
            const user2 = await GithubUserSchema.findOne({ userName: userInfo.data.login })
            ctx.session.userInfo = user2
            ctx.redirect('/myBook')
        } else {// 用户已存在
            ctx.session.userInfo = user
            ctx.redirect('/myBook')
        }
    } else {
        console.log('github client_id错误');
    }
}