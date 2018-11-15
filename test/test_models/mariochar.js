const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarioCharSchema = new Schema({
    name: String,
    weight: Number
})

module.exports = mongoose.model('mariochar', MarioCharSchema)
