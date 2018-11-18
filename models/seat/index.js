import mongoose from 'mongoose'
import { utils } from './utils'
const Schema = mongoose.Schema

const Seat = new Schema({
    sid: Number,
    floor: Number,
    occupiedTime: {
        type: Date,
        default: null
    },
    studentID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
})

// statics -> for class
Seat.statics.renew = utils.statics.renewSeat
Seat.statics.mount = utils.statics.mountSeat
// methods -> for specific instance
Seat.methods.isTaken = utils.methods.checkSeatIsTaken

export default mongoose.model('Seat', Seat)
