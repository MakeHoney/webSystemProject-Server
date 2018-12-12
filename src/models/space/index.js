import mongoose from 'mongoose'
import { modules } from './modules'
const Schema = mongoose.Schema

const Space = new Schema({
  id: Number,
  placeName: String,
  spaceID: String,
  occupiedAt: {
    type: Date,
    default: null
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
})

Space.statics.reserve = modules.statics.reserveSpace
Space.statics.cancel = modules.statics.cancelReservation

Space.methods.isTaken = modules.methods.checkSpaceIsTaken
export default mongoose.model('Space', Space)
