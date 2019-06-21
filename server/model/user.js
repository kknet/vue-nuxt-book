const mongoose = require('mongoose')
const Schema = mongoose.Schema
const db = require('../js/init.js') 
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


module.exports = db.model('User', UserSchema)