const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../js/init.js') 
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    avatar: {
        type: String,
        unique: true,
        required: true
    }
})


module.exports = db.model('User', UserSchema)