// scheduler function
export const renewSeat = async () => {
  try {
    // 120 -> 고정된 상수로 변경할 것
    for(let i = 0; i < 120; i++) {
      let seat = await this.findOne({ seatNum: i })
      const occupiedTime = seat.occupiedTime.getTime()
      const now = new Date().getTime()
      const difference = now - occupiedTime
      // try {
      //     let testSeat = await this.findOne({seatNum: i}).populate('user')
      // } catch (err) {
      //     console.err(err)
      // }
      let testSeat = await this.findOne({seatNum: i}).populate('user')
      console.log(testSeat)
      // 2 hours: 60000 * 60 * 2

      if(difference > 60000) {
        // uid -> ''
        // occupied time -> Date.now()
        await seat.update({ user: 5 })
        await seat.save()
      }
    }
  } catch (err) {

  }
}
