import { utils } from '../../utils'

export const modules = {
  statics: {
    async createUser (email, studentID, password, name) {
      try {
        const user = new this({
          email,
          studentID,
          password: utils.encrypt(password),
          name
        })
        return await user.save()
      } catch (err) {
        throw new Error(err)
      }
    },
    async registerUser ({ studentID, email, password, name }) {
      let stuIDCheck = await this.findOne({ studentID })
      let emailCheck = await this.findOne({ email })

      if (stuIDCheck) {
        throw new Error('same student ID already exist!')
      } else if (emailCheck) {
        throw new Error('The email already registered!')
      } else {
        await this.create(email, studentID, password, name)
          .catch(err => { throw err })
      }
    },
    async checkUserAuth ({ email, password, secret }) {
      let user = await this.findOne({ email })
      if (!user) {
        throw new Error("user doesn't exist!")
      } else {
        if(user.verify(password)) {
          return await utils.createToken({ user, secret })
        } else {
          throw new Error('wrong password')
        }
      }
    }
  },
  methods: {
    verifyUser (password) {
      return this.password === utils.encrypt(password)
    },
    checkUserHasSeat (opt) {
      switch(opt) {
        case 'reserve':
          if(this.seat) throw new Error(`user already has a seat! (seat id: ${this.seat})`)
          break
        case 'returnOrExtend':
          if(!this.seat) throw new Error('user got no seat to return or extend!')
          break
        default:
          throw new Error('specify option!')
      }
    }
  }
}
