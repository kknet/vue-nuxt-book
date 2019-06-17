const Router = require('koa-router')
const router = new Router({ prefix: '/api' }) // 接口前缀、
const axios = require('axios')
const path = require('path')
// const conf = require('../../assets/js/conf')
const conf = require(path.resolve(__dirname,'../../../assets/js/conf')) 
const KOA_BASE_URL = conf.KOA_BASE_URL
const KOA_BASE_URL2 = conf.KOA_BASE_URL2

// 女生书籍
router.get('/homeBooks', async ctx => {
console.log(conf);

    const [hot, potential, good, vip, newBook, endBook, romance, immortal, modern, campus, fantasy, science, suspense, woman] = await Promise.all([
        axios.get(`${KOA_BASE_URL}/54d43437d47d13ff21cad58b`), //热门书籍
        axios.get(`${KOA_BASE_URL}/54d43709fd6ec9ae04184aa5`), //潜力榜
        axios.get(`${KOA_BASE_URL}/5a684551fc84c2b8efaab179`), //好评
        axios.get(`${KOA_BASE_URL}/57eb959df60eb7e21fb3a8b7`), // vip
        axios.get(`${KOA_BASE_URL}/550b841715db45cd4b022107`), //  新书榜单
        axios.get(`${KOA_BASE_URL}/5645482405b052fe70aeb1b5`), //  潇湘月票榜
        axios.get(`${KOA_BASE_URL2}?gender=female&type=hot&major=${encodeURIComponent('古代言情')}&start=0&limit=4`), //  古代言情
        axios.get(`${KOA_BASE_URL2}?gender=female&type=hot&major=${encodeURIComponent('武侠仙侠')}&start=0&limit=4`), //  武侠仙侠
        axios.get(`${KOA_BASE_URL2}?gender=female&type=hot&major=${encodeURIComponent('现代言情')}&start=0&limit=4`), //  现代言情
        axios.get(`${KOA_BASE_URL2}?gender=female&type=hot&major=${encodeURIComponent('青春校园')}&start=0&limit=4`), //  青春校园
        axios.get(`${KOA_BASE_URL2}?gender=female&type=hot&major=${encodeURIComponent('玄幻奇幻')}&start=0&limit=4`), //  玄幻奇幻
        axios.get(`${KOA_BASE_URL2}?gender=female&type=hot&major=${encodeURIComponent('科幻')}&start=0&limit=4`), //  科幻
        axios.get(`${KOA_BASE_URL2}?gender=female&type=hot&major=${encodeURIComponent('悬疑灵异')}&start=0&limit=4`), //  悬疑灵异
        axios.get(`${KOA_BASE_URL2}?gender=female&type=hot&major=${encodeURIComponent('女尊')}&start=0&limit=4`), //  女尊
    ])
    if (hot.data.ok == true) {
        const femaleList = {
            hot: hot.data.ranking.books || [],
            potential: potential.data.ranking.books || [],
            good: good.data.ranking.books || [],
            vip: vip.data.ranking.books || [],
            newBook: newBook.data.ranking.books || [],
            endBook: endBook.data.ranking.books || [],
            romance: romance.data.books || [],
            immortal: immortal.data.books || [],
            modern: modern.data.books || [],
            campus: campus.data.books || [],
            fantasy: fantasy.data.books || [],
            science: science.data.books || [],
            suspense: suspense.data.books || [],
            woman: woman.data.books || []
        }
        ctx.body = {
            code: 10000,
            femaleList
        }
    }

})
module.exports = router