import User from '../user'

export const modules = {
  statics: {
    async reserveSpace ({ studentID, spaceID, DateNeeded }) {
      const user = await User.findOne({ studentID })
      const space = await this.findOne({ spaceID })

      // Need exception handler here

      await user.update({ space: space._id })
      await space.update({ occupiedAt: new Date(2018, 11, 24, 10, 33) })
      await space.update({ user: user._id })
    }
  },
  methods: {

  }
}
