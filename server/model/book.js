const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../core/dbInit.js') 
const BookSchema = new Schema({
    id: {   // 书籍的id
        type: String,
        required: true
    },
    user_id: {  // 用户的id
        type: String,
        required: true
    },

    cover: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    readChapter:{   // 阅读章节
        type: String,
        default:''
    },
    readChapterIndex: { // 阅读章节的下标
        type: Number,
        default:0
    },
    lastChapter:{   // 更新到多少章
        type: String,
        required: true
    },

    updated: {  // 更新时间
        type: String,
        required: true
    }
})


module.exports = db.model('book', BookSchema)

