// Call list of collections
import mongoose from "mongoose";
import { Seat } from "../../src/models";

const mountSeat = async (...SeatPerFloor) => {
  let seatNum = 0
  try {
    for (let i = 0; i < SeatPerFloor.length; i++) {
      for (let j = 0; j < SeatPerFloor[i]; j++, seatNum++) {
        let seat = new Seat({
          seatNum,
          floor: i
        })
        await seat.save()
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const mountSeat2 = async (...SeatPerFloor) => {
  let seatNum = 1
  let type = -1
  try {
    for (let i = 0; i < SeatPerFloor.length; i++) {
      for (let j = 0; j < SeatPerFloor[i]; j++, seatNum++) {
        if ((seatNum > 0 && seatNum <= 180)
          || (seatNum > 205 && seatNum <= 305)
          || (seatNum > 625 && seatNum <= 826)) {
          type = 0
        } else if (seatNum > 360 && seatNum <= 470) {
          type = 2
        } else {
          type = 1
        }
        let seat = new Seat({
          seatNum,
          type,
          floor: i + 1
        })
        await seat.save()
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}


export default async database => {
  // Call list of collections
  let collections = await database.db.listCollections().toArray()

  // Check the collection (seat) already exist
  for (let collection of collections) {

    // If collection exists, drop original collection
    if (collection.name === 'seats') {
      await mongoose.connection.collections.seats.drop()
      break
    }
  }
  // mount seats data
  await mountSeat(30, 30, 30, 30)
}
