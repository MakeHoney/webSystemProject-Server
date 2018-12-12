import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Place = new Schema({
  placeName: String,
  placeNum: Number,
  rooms: [{
    roomNum: String,
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

const Space = new Schema({
  placeID: Number,
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

// 장소예약
// 장소예약 취소
// 장소예약시간 만료

// 라우터
// 예약, 예약 취소 라우터
// 스케쥴러, 마운터 장소 room --> 여러개

export default mongoose.model('Place', Place)
