import { encrypt } from '../../utils/encrypt'

export const utils = {
    statics: {
        async createUser (email, studentID, password, name) {
            try {
                const user = new this({
                    email,
                    studentID,
                    password: encrypt(password),
                    name
                })
                return await user.save()
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    methods: {
        verifyUser (password) {
            return this.password === encrypt(password)
        },
        checkUserHasSeat (opt) {
            switch(opt) {
                case 'reserve':
                    if(this.sid) throw new Error(`user already has a seat! (sid: ${this.sid})`)
                    break
                case 'returnOrExtend':
                    if(!this.sid) throw new Error('user got no seat to return or extend!')
                    break
                default:
                    throw new Error('specify option!')
            }
        }
    }
}
