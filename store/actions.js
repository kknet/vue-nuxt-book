import * as types from './mutations-type'
const conf = require('@/assets/js/conf')
const BASE_URL = conf.BASE_URL
const BASE_URL2 = conf.BASE_URL2
const actions = {
    async nuxtServerInit({ commit }, { req, $axios }) {
        // 首页 男生
        const [hot, potential, good, vip, newBook, endBook, fantasy, knight, urban, history, game, science] = await Promise.all([
            $axios.$get(`${BASE_URL}/54d42d92321052167dfb75e3`), //热门书籍
            $axios.$get(`${BASE_URL}/54d42e72d9de23382e6877fb`),//潜力榜
            $axios.$get(`${BASE_URL}/5a6844aafc84c2b8efaa6b6e`),//好评
            $axios.$get(`${BASE_URL}/57eb86f0ef9e5a8f20543d7d`),// vip
            $axios.$get(`${BASE_URL}/5a39ca3ffc84c2b8ef82da82`),//  新书榜单
            $axios.$get(`${BASE_URL}/564eb878efe5b8e745508fde`),//  完结榜
            $axios.$get(`${BASE_URL2}?gender=male&type=hot&major=${encodeURIComponent('玄幻')}&start=0&limit=4`),//  玄幻
            $axios.$get(`${BASE_URL2}?gender=male&type=hot&major=${encodeURIComponent('仙侠')}&start=0&limit=4`),//  仙侠
            $axios.$get(`${BASE_URL2}?gender=male&type=hot&major=${encodeURIComponent('都市')}&start=0&limit=4`),//  都市
            $axios.$get(`${BASE_URL2}?gender=male&type=hot&major=${encodeURIComponent('历史')}&start=0&limit=4`),//  历史
            $axios.$get(`${BASE_URL2}?gender=male&type=hot&major=${encodeURIComponent('游戏')}&start=0&limit=4`),//  游戏
            $axios.$get(`${BASE_URL2}?gender=male&type=hot&major=${encodeURIComponent('科幻')}&start=0&limit=4`),//  科幻
        ])
        if (hot.ok == true) {
            const data = {
                hot: hot.ranking.books || [],
                potential: potential.ranking.books || [],
                good: good.ranking.books || [],
                vip: vip.ranking.books || [],
                newBook: newBook.ranking.books || [],
                endBook: endBook.ranking.books || [],
                fantasy:fantasy.books || [],
                knight:knight.books || [],
                urban:urban.books || [],
                history:history.books || [],
                game:game.books || [],
                science:science.books || [],
            }
            commit(types.HOME_LIST, data)
        }

        // const session = req.ctx.session
        // commit(types.USERNAME, session && session.userName ? session.userName : '')
        // commit(types.USERID, session && session.user_id ? session.user_id : '')
        // // 查询相关便签,查询文章列表
        // const [data, data1] = await Promise.all([$axios.$post('/api/findNote'), $axios.$get('/api/findArticle')])
        // if (data.code == 0 && data1.code == 0) {
        //     commit(types.NODEDATA, data.note)   // 标签
        //     commit(types.CATEGORIES, data.result) // 分类
        //     commit(types.ARTICLEARR, { 1: data1.articles })    // 默认拿取第一页数据
        //     commit(types.ARCHIVEARR, data1.articles)
        //     commit(types.COUNT, data1.count)
        //     commit(types.PAGESIZE, data1.pageSize)
        // }
    },

    // // 缓存分页数据
    // setArticleArr({ commit, state }, { id, list }) {
    //     let newData = state.articleArr
    //     if (!newData[id]) {
    //         newData[id] = list
    //     }
    //     commit(types.ARTICLEARR, newData)
    // }

}
export default actions