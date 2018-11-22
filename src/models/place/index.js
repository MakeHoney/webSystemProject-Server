import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Place = new Schema({
  placeNum: String,
  placeName: String,
  reservedAt: Date,
  occupiedAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
})

export default mongoose.model('Place', Place)
