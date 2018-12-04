import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Place = new Schema({
  placeName: String,
  placeNum: Number,
  rooms: [{
    roomNum: Number,
    capacity: Number,
  }],
  reservedAt: {
    type: Date,
    default: null
  },
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

export default mongoose.model('Place', Place)
