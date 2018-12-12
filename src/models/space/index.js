import mongoose from 'mongoose'
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

export default mongoose.model('Space', Space)
