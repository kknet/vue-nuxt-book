const mongoose = require('mongoose')
const BLOG = 'book'     //数据库名字
const URL = `mongodb://127.0.0.1:27017/${BLOG}`
// 创建数据库连接
const db = mongoose.createConnection(URL, {
    // useNewUrlParser: false
    useCreateIndex: true,
    useNewUrlParser: true
})

db.once('open', () => console.log('mongodb数据库连接成功'))
db.once('error', (err) => console.log('mongodb数据库连接失败', err));
// 导出模块
module.exports = db