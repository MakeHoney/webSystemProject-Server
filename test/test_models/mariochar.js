const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MarioCharSchema = new Schema({
    name: String,
    weight: Number
})

// model (represents collection of database)
module.exports = mongoose.model('mariochar', MarioCharSchema)
