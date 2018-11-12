const User = require('../../models/user')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { uid, password } = req.body
    const createUser = user => {
        if (user) {
            throw new Error('user name already exist!')
        } else {
            User.create(uid, password)
        }
    }

    try {
        let userExist = await User.findOneByUID(uid)
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

exports.login = async (req, res) => {
    const { uid, password } = req.body
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
                            uid: user.uid,
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
        let userExist = await User.findOneByUID(uid)
        let token = await check(userExist)
        res.json({
            message: 'signed in successfully!',
            uid,
            token
        })
    } catch (err) {
        res.status(403).json({
            message: err.message
        })
    }
}

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}
