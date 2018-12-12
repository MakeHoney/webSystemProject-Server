import User from '../user'

export const modules = {
  statics: {
    async reserveSpace ({ studentID, placeName, spaceID, DateNeeded }) {
      const user = await User.findOne({ studentID })
      const space = await this.findOne({ placeName, spaceID })

      // Need exception handler here
      user.hasSpace('reserve')
      space.isTaken('reserve')

      await user.update({ space: space._id })
      await space.update({ occupiedAt: new Date(2018, 11, 24, 10, 33) })
      await space.update({ user: user._id })
    },
    async cancelReservation ({ studentID }) {
      const user = await User.findOne({ studentID })
        .populate('space')

      // exception handler here
      user.hasSpace('cancel')
      const space = await this.findById(user.space._id)

      // exception handler here
      space.isTaken('cancel')

      await space.update({ user: null })
      await space.update({ occupiedAt: null })

      await user.update({ space: null })
    }
  },
  methods: {
    checkSpaceIsTaken (opt) {
      switch (opt) {
        case 'reserve':
          if(this.user) throw new Error('space is already taken!')
          break
        case 'cancel':
          if(!this.user) throw new Error('space is not occupied!')
          break
        default:
          throw new Error('specify option!')
      }
    }
  }
}
