const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../js/init.js') 
const BookSchema = new Schema({
    id: {
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

