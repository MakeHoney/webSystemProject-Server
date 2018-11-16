import { User } from '../../models'
import jwt from 'jsonwebtoken'

export const controller = {
    async register(req, res) {
        const { email, studentID, password, name } = req.body
        const createUser = async user => {
            try {
                if (user) {
                    throw new Error('same student ID already exist!')
                } else {
                    await User.create(email, studentID, password, name)
                }
            } catch (err) {
                throw new Error(err)
            }
        }

        try {
            let userExist = await User.findOne({ studentID })
            await createUser(userExist)
            res.json({
                message: 'successfully registered!'
            })
        } catch (err) {
            res.status(409).json({
                message: err.message
            })
        }
    },
    async login(req, res) {
        const { email, password } = req.body
        const secret = req.app.get('jwt-secret')

        const check = user => {
            if (!user) {
                throw new Error("user doesn't exist!")
            } else {
                if(user.verify(password)) {
                    return new Promise((resolve, reject) => {
                        jwt.sign(
                            {
                                _id: user._id,
                                email: user.email,
                            },
                            secret,
                            {
                                expiresIn: '7d',
                                subject: 'userInfo'
                            }, (err, token) => {
                                if (err) reject(err)
                                resolve(token)
                            })
                    })
                } else {
                    throw new Error('wrong password')
                }
            }
        }

        try {
            let userExist = await User.findOne({ email })
            let token = await check(userExist)
            res.json({
                message: 'signed in successfully!',
                email,
                token
            })
        } catch (err) {
            res.status(403).json({
                message: err.message
            })
        }
    },
    async check(req, res) {
        res.json({
            success: true,
            info: req.decoded
        })
    }
}
