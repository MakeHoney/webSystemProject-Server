import mongoose from 'mongoose'
import { modules } from './modules'

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
Seat.statics.reserve = modules.statics.reserveSeat
Seat.statics.return = modules.statics.returnSeat
Seat.statics.extend = modules.statics.extendSeat
Seat.statics.renew = modules.statics.renewSeat
Seat.statics.mount = modules.statics.mountSeat
// methods -> for specific instance
Seat.methods.isTaken = modules.methods.checkSeatIsTaken

export default mongoose.model('Seat', Seat)
