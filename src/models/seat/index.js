import mongoose from 'mongoose'
import { modules } from './modules'

const Schema = mongoose.Schema

const Seat = new Schema({
  seatNum: Number,
  floor: Number,
  type: Number,
  occupiedTime: {
    type: Date,
    default: null
  },
  user: {
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

// methods -> for specific instance
Seat.methods.isTaken = modules.methods.checkSeatIsTaken

export default mongoose.model('Seat', Seat)
