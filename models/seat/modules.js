import User from "../user";

export const modules = {
  statics: {
    async reserveSeat ({ studentID, seatNum }) {
      const user = await User.findOne({ studentID })
      const seat = await this.findOne({ seatNum })

      // exception handler
      user.hasSeat('reserve')
      seat.isTaken('reserve')

      await user.update({ seat: seat._id })
      await seat.update({ occupiedTime: Date.now() })
      await seat.update({ user: user._id })
    },
    async returnSeat ({ studentID }) {
      const user = await User.findOne({studentID})
        .populate('seat')
      // exception handler for user
      user.hasSeat('returnOrExtend')

      const seat = await this.findById(user.seat._id)
      // exception handler for seat
      seat.isTaken('returnOrExtend')

      // seat's studentID, occupiedTime 초기화
      await seat.update({user: null})
      await seat.update({occupiedTime: null})

      // user's seat 초기화
      await user.update({seat: null})
    },
    async extendSeat ({ studentID }) {
      /*
      * TODO: need exception handling for extension within 2hours
      * */
      const user = await User.findOne({ studentID })
        .populate('seat')
      // exception handler for user
      user.hasSeat('returnOrExtend')

      const seat = await this.findById(user.seat._id)
      // exception handler for seat
      seat.isTaken('returnOrExtend')

      // update time
      await seat.update({ occupiedTime: Date.now() })
    }
  },
  methods: {
    checkSeatIsTaken (opt) {
      switch (opt) {
        case 'reserve':
          if(this.user) throw new Error('seat is already taken!')
          break
        case 'returnOrExtend':
          if(!this.user) throw new Error('seat is not occupied!')
          break
        default:
          throw new Error('specify option!')
      }
    }
  }
}
