const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../core/dbInit.js') 
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:'http://img1.imgtn.bdimg.com/it/u=1471800268,3373504429&fm=26&gp=0.jpg'
    }
})


module.exports = db.model('User', UserSchema)