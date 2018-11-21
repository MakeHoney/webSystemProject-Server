import { Seat } from '../models'
import { utils } from '../utils'

// scheduler function
export const renewSeat = async renewInterval => {
  // const database = utils.dbConnection()
  try {
    // 120 -> 고정된 상수로 변경할 것
    for(let i = 0; i < 120; i++) {
      const seat = await Seat.findOne({ seatNum: i })
        .populate('user')
      let occupiedTime
      !seat.occupiedTime
      ? occupiedTime = 0
      : occupiedTime = seat.occupiedTime.getTime()

      const now = new Date().getTime()
      const difference = now - occupiedTime
      // console.log(`difference: ${difference}`)

      // 2 hours: 60000 * 60 * 2
      if(difference > renewInterval && seat.user) {
        try {
          await Seat.return({studentID: seat.user.studentID})
        } catch (err) {
          console.error(err)
        }
      }
    }
    // database.close()
  } catch (err) {

  }
}
