const Router = require('koa-router')
const router = new Router({ prefix: '/api' }) // 接口前缀、
const axios = require('axios')
const path = require('path')
const Book = require('../../model/book')
// const conf = require('../../assets/js/conf')
const { KOA_BASE_URL, KOA_BASE_URL2, KOA_BOOK, KOA_BOOK_COMMENT, KOA_BOOK_CATALOG } = require(path.resolve(__dirname, '../../../assets/js/conf'))
// 女生书籍分类
router.get('/femaleBooks', async ctx => {
    const [hot, hotSearch, retain, potential, good, vip, newBook, romance, immortal, modern, campus, fantasy, science, suspense, woman] = await Promise.all([
        axios.get(`${KOA_BASE_URL}/54d43437d47d13ff21cad58b`), //热门书籍
        axios.get(`${KOA_BASE_URL}/5a684515fc84c2b8efaa9875`), //热搜榜单
        axios.get(`${KOA_BASE_URL}/5645482405b052fe70aeb1b5`), //留存榜单
        axios.get(`${KOA_BASE_URL}/54d43709fd6ec9ae04184aa5`), //潜力榜
        axios.get(`${KOA_BASE_URL}/5a684551fc84c2b8efaab179`), //好评
        axios.get(`${KOA_BASE_URL}/57eb959df60eb7e21fb3a8b7`), // vip
        axios.get(`${KOA_BASE_URL}/550b841715db45cd4b022107`), //  新书榜单
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
            hotSearch: hotSearch.data.ranking.books || [],
            retain: retain.data.ranking.books || [],
            potential: potential.data.ranking.books || [],
            good: good.data.ranking.books || [],
            vip: vip.data.ranking.books || [],
            newBook: newBook.data.ranking.books || [],
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


// 图书详情和评论
router.get('/book', async ctx => {
    const id = ctx.query.id
    if (!id) {
        return ctx.body = {
            code: -1,
            msg: '请输入书籍id',
            book: {},
            comment: []
        }
    }
    // const limit = ctx.query.limit || 5  // 返回几条
    const [data, comment] = await Promise.all([
        axios.get(`${KOA_BOOK}/${id}`),
        axios.get(`${KOA_BOOK_COMMENT}?book=${id}&sortType=newest&limit=5`)
    ])
    ctx.body = {
        code: 10000,
        book: data.data,
        comment: comment.data.docs,
    }
})

// 查询书籍是否已收藏
router.get('/isCollection', async ctx => {
    const id = ctx.query.id
    if (!id) {
        return ctx.body = {
            code: -1,
            msg: '请输入书籍id',
            isCollection: false
        }
    }

    let isCollection = null
    const user_id = ctx.session.userInfo && ctx.session.userInfo._id

    if (user_id) {
        isCollection = await Book.findOne({ id, user_id })
    }
    // 查询本书籍是否有加入书架
    ctx.body = {
        code: 10000,
        isCollection: isCollection ? true : false
    }
})

// 图书评论
router.get('/comment', async ctx => {
    const id = ctx.query.id
    if (!id) {
        return ctx.body = {
            code: -1,
            msg: '请输入书籍id',
            comment: []
        }
    }
    const start = ctx.query.start || 20
    const { data } = await axios.get(`${KOA_BOOK_COMMENT}?book=${id}&sortType=newest&limit=15&start=${start}`)
    ctx.body = {
        code: 10000,
        comment: data
    }
})

// 章节目录
router.get('/chapters', async ctx => {
    const id = ctx.query.id
    if (!id) {
        return ctx.body = {
            code: -1,
            msg: '请输入书籍id',
            comment: []
        }
    }
    const { data } = await axios.get(`${KOA_BOOK_CATALOG}/${id}?view=chapters`)
    if (data.ok) {
        ctx.body = {
            code: 10000,
            data: data.mixToc.chapters
        }
    }
})

// 加入书架
router.post('/addBook', async ctx => {
    const data = ctx.request.body
    const { _id, userName } = ctx.session.userInfo
    if (!userName) {
        return ctx.body = {
            code: -1,
            msg: '请先登录'
        }
    }

    const book = await Book.findOne({ id: data._id, _id })
    if (book) {
        return ctx.body = {
            code: -1,
            msg: '已经添加过该书籍了'
        }
    }
    data.id = data._id
    data.user_id = _id
    delete data._id
    let newBook = new Book(data)
    await newBook.save()
    ctx.body = {
        code: 10000,
        msg: '加入成功'
    }
})

// 查询我的书架
router.get('/getBook', async ctx => {
    const user_id = ctx.session.userInfo && ctx.session.userInfo._id
    if (!user_id) {
        return ctx.body = {
            code: -1
        }
    }
    const book = await Book.find({ user_id }).sort({ _id: 1 })
    ctx.body = {
        code: 10000,
        data: {
            book,
            msg: '查询成功'
        }
    }
})

// 查询我的书架单条数据
router.get('/getBookOne', async ctx => {
    const user_id = ctx.session.userInfo && ctx.session.userInfo._id
    let book = null
    if (user_id) {
        book = await Book.findOne({ id: ctx.query.id, user_id })
    }

    ctx.body = {
        code: 10000,
        data: {
            book,
            msg: '查询成功'
        }
    }
})


// 阅读的章节放到服务器
router.post('/postBook', async ctx => {
    const user_id = ctx.session.userInfo && ctx.session.userInfo._id
    const { readChapter, readChapterIndex, id } = ctx.request.body
    await Book.updateOne({ id, user_id }, {
        $set: {
            readChapter,
            readChapterIndex
        }
    })

    const data = await Book.findOne({ id, user_id })
    ctx.body = {
        code: 10000,
        data: {
            book: data,
            msg: '添加成功',
        }
    }
})

// 删除我的书架
router.post('/deleteBook', async ctx => {
    const { id } = ctx.request.body
    const user_id = ctx.session.userInfo._id
    await Book.deleteOne({ id, user_id })
    ctx.body = {
        code: 10000,
        msg: '删除成功'
    }
})
// 
module.exports = router