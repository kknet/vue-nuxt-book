const state = () => ({
    homeList: {     // 首页
        hot: [], //热门书籍
        potential: [],//潜力榜
        good: [],    //好评
        vip: [], // vip
        newBook: [],  //  新书榜单
        endBook: [],// 完结榜
        fantasy: [], //  玄幻
        knight: [], //  仙侠
        urban: [], //  都市
        history: [], //  历史
        game: [], //  游戏
        science: []//  科幻
    },

    femaleList: {
        hot: [],
        potential: [],
        good: [],
        vip:  [],
        newBook:  [],
        endBook:  [],
        romance:  [],
        immortal: [],
        modern:  [],
        campus:  [],
        fantasy:  [],
        science: [],
        suspense:  [],
        woman: []
    },  // 女生
    book:{},    //图书详情
    comments:{},    // 评论
    catalogList:{}, //图书章节
    catBooks:{},    // 图书主分类
    catBooksLv2:{}, // 图书子分类
})
export default state