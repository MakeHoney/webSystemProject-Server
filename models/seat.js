const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Seat = new Schema({
    sid: Number,
    floor: Number,
    isOccupied: Boolean
})

Seat.statics.findOneBySID = async function (sid) {
    try {
        return await this.findOne({
            sid
        })
    } catch (err) {
        throw new Error(err)
    }
}

Seat.statics.mount = async function (first, second, third, fourth) {
    let sid = 0

    try {
        for (let i = 0; i < arguments.length; i++) {
            for (let j = 0; j < arguments[i]; j++, sid++) {
                let seat = new this({
                    sid,
                    floor: i,
                    isOccupied: false
                })
                await seat.save()
            }
        }
    } catch (err) {
        throw new Error(err)
    }
}

Seat.methods.updateSeat = async function ({ isOccupied }) {
    try {
        await this.update({ isOccupied })
    } catch (err) {
        throw new Error(err)
    }
}

Seat.methods.isTaken = function () {
    if(this.isOccupied) {
        throw new Error('seat is already taken!')
    }
}


module.exports = mongoose.model('Seat', Seat)
