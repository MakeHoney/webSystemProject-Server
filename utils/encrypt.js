import crypto from 'crypto'
import { config } from '../config'

exports.encrypt = password => {
    return crypto.createHmac('sha1', config.secret)
        .update(password)
        .digest('base64')
}
