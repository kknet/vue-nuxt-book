const state = () => ({
    homeList: {     // 首页
        hot: [], //热门书籍
        retain:[],  // 留存榜
        hotSearch: [], // 热搜绑
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
        retain:[],  // 留存榜
        hotSearch: [], // 热搜绑
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
    rankCategory:{},    //排行榜所有分类
    searchWords:[] ,    // 搜索关键词
    showTopMenu: false, // 顶部菜单栏
    userName:'',    // 登录的用户名
    bookRead:{},    // 正在阅读的图书详情
    settingVisible: -1, // -1 不显示 0 章节 1 进度 2 主题 3 字体
    menuVisible:false,// 是否显示顶部和底部菜单
    showMore:false,    // 阅读栏更多
})
export default state