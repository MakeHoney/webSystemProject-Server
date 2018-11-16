import { User } from '../../models'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    const { email, studentID, password, name } = req.body
    const createUser = async user => {
        try {
            if (user) {
                throw new Error('user name already exist!')
            } else {
                await User.create(email, studentID, password, name)
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    try {
        let userExist = await User.findOneByUID(studentID)
        await createUser(userExist)
        res.json({
            message: 'successfully registered!'
        })
    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
}

export const login = async (req, res) => {
    const { studentID, password } = req.body
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
                            studentID: user.studentID,
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
        let userExist = await User.findOneByUID(studentID)
        let token = await check(userExist)
        res.json({
            message: 'signed in successfully!',
            studentID,
            token
        })
    } catch (err) {
        res.status(403).json({
            message: err.message
        })
    }
}

export const check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}
