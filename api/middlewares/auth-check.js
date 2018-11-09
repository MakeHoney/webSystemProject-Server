const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.header['x-access-token'] || req.query.token

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'user not signed in'
        })
    }

    const check = () => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
    }

    try {
        req.decoded = await check()
        next()
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}
