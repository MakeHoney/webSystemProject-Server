const mongoose = require('mongoose')
const { encrypt } = require('../utils/encrypt')
const Schema = mongoose.Schema

const User = new Schema({
    uid: String,
    password: String
})
/**
 * don't use arrow func: no lexical scope!
 */

// statics -> for class
User.statics.create = function (uid, password) {
    const user = new this({
        uid,
        password: encrypt(password)
    })
    // console.log(user)
    return user.save()
}

User.statics.findOneByUID = async function (uid) {
    // let a = await this.findOne({uid})
    // console.log(a.todo)
    return await this.findOne({
        uid
    })
}

// methods -> for specific instance
User.methods.verify = function (password) {
    return this.password === encrypt(password)
}

module.exports = mongoose.model('User', User)
