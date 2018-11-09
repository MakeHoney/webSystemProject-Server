const crypto = require('crypto')
const config = require('../config')

exports.encrypt = password => {
    return crypto.createHmac('sha1', config.secret)
        .update(password)
        .digest('base64')
}
