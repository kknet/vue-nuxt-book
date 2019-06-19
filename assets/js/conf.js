// export const BASE_URL = '/zhuishu/ranking'//  各种排行榜
// export const BASE_URL2 = '/zhuishu/book/by-categories' // 获取分类下的图书列表
const BASE_URL = 'http://api.zhuishushenqi.com'
const BOOK_URL = 'https://novel.juhe.im'

module.exports = {
    BASE_URL: '/zhuishu/ranking',//  各种排行榜
    BASE_URL2: '/zhuishu/book/by-categories', // 获取分类下的图书列表
    BOOK: '/zhuishu/book',   //图书详情
    KOA_BASE_URL: `${BASE_URL}/ranking`,
    KOA_BASE_URL2: `${BASE_URL}/book/by-categories`, // 
    KOA_BOOK: `${BASE_URL}/book`,    // 图书详情
    KOA_BOOK_COMMENT: `${BOOK_URL}/book/short-reviews`,  // 评论
    KOA_BOOK_CATALOG:`${BASE_URL}/mix-atoc`,    // 章节目录
}