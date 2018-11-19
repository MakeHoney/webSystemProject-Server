import User from "../user";

export const modules = {
  statics: {
    async reserveSeat ({ studentID, sid }) {
      const user = await User.findOne({ studentID })
      const seat = await this.findOne({ sid })

      // exception handler
      user.hasSeat('reserve')
      seat.isTaken('reserve')

      await user.update({ sid: seat._id })
      await seat.update({ studentID: user._id })
    },
    async returnSeat ({ studentID }) {
      const user = await User.findOne({studentID})
        .populate('sid')
      // exception handler for user
      user.hasSeat('returnOrExtend')

      const seat = await this.findById(user.sid._id)
      // exception handler for seat
      seat.isTaken('returnOrExtend')

      // seat's studentID, occupiedTime 초기화
      await seat.update({studentID: null})
      await seat.update({occupiedTime: null})

      // user's sid 초기화
      await user.update({sid: null})
    },
    async extendSeat ({ studentID }) {
      /*
      * TODO: need exception handling for extension within 2hours
      * */
      const user = await User.findOne({ studentID })
        .populate('sid')
      // exception handler for user
      user.hasSeat('returnOrExtend')

      const seat = await this.findById(user.sid._id)
      // exception handler for seat
      seat.isTaken('returnOrExtend')

      // update time
      await seat.update({ occupiedTime: Date.now() })
    },
    // scheduler function
    async renewSeat () {
      try {
        // 120 -> 고정된 상수로 변경할 것
        for(let i = 0; i < 120; i++) {
          let seat = await this.findOne({ sid: i })
          const occupiedTime = seat.occupiedTime.getTime()
          const now = new Date().getTime()
          const difference = now - occupiedTime
          // try {
          //     let testSeat = await this.findOne({sid: i}).populate('user')
          // } catch (err) {
          //     console.err(err)
          // }
          let testSeat = await this.findOne({sid: i}).populate('user')
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
    },
    async mountSeat (first, second, third, fourth) {
      let sid = 0

      try {
        for (let i = 0; i < arguments.length; i++) {
          for (let j = 0; j < arguments[i]; j++, sid++) {
            let seat = new this({
              sid,
              floor: i
            })
            await seat.save()
          }
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  methods: {
    checkSeatIsTaken (opt) {
      switch (opt) {
        case 'reserve':
          if(this.studentID) throw new Error('seat is already taken!')
          break
        case 'returnOrExtend':
          if(!this.studentID) throw new Error('seat is not occupied!')
          break
        default:
          throw new Error('specify option!')
      }
    }
  }
}