// Call list of collections
import mongoose from "mongoose";
import Seat from "../../models/seat";

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
