const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Seat = new Schema({
    sid: Number,
    floor: Number,
    isOccupied: Boolean
})

Seat.statics.mount = async function (first, second, third, fourth) {
    let sid = 0

    for(let i = 0; i < arguments.length; i++) {
        for (let j = 0; j < arguments[i]; j++, sid++) {
            let seat = new this({
                sid,
                floor: i,
                isOccupied: false
            })
            await seat.save()
        }
    }
}

Seat.statics.findOneBySID = async function (sid) {
    return await this.findOne({
        sid
    })
}

module.exports = mongoose.model('Seat', Seat)
