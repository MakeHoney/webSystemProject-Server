// Call list of collections
import mongoose from "mongoose";
import Seat from "../../models/seat";

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

  // TODO: mount 메소드 test 디렉토리로 옮길 것 (독립적인 메소드로 동작하도록)
  // mount seats data
  await Seat.mount(30, 30, 30, 30)
}
