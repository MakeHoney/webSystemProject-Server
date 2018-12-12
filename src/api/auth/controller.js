import { User } from '../../models'
import { mailer } from '../../utils/mailer'
import { config } from '../../config'
import { createEmailToken } from '../../utils/create-token'
import jwt from "jsonwebtoken";

export const controller = {
  async sendAuthMail (req, res) {
    const { email, studentID, password, name } = req.body
    try {
      await User.checkDup({ studentID, email })

      const mailOptions = Object.assign({}, mailer.options)
      const transporter = mailer.transporter
      const token = await createEmailToken({
        email,
        studentID,
        password,
        name,
        secret: req.app.get('jwt-secret')
      })
      mailOptions.to = email
      mailOptions.text += `${config.host}/auth/register?token=${token}`

      const info = await transporter.sendMail(mailOptions)
      res.json({
        message: info.response
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },

  /*
  * TODO: 프론트페이지로 리다이렉트
  * */
  async register (req, res) {
    const token = req.query.token
    try {
      let decoded = await jwt.verify(token, req.app.get('jwt-secret'))

      await User.register({
        studentID: decoded.studentID,
        email: decoded.email,
        password: decoded.password,
        name: decoded.name
      })

      res.json({
        message: 'successfully registered!'
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },

  // TODO: response에 studentID 추가
  async login (req, res) {
    const { email, password } = req.body
    const secret = req.app.get('jwt-secret')
    try {
      const token = await User.checkAuth({ email, password, secret })
      const user = await User.findOne({ email })
      const studentID = user.studentID
      res.json({
        message: 'signed in successfully!',
        email,
        studentID,
        token
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async check(req, res) {
    res.json({
      success: true,
      info: req.decoded
    })
  },
  async personalInfo (req, res) {
    const { studentID } = req.body
    try {
      const userWithSeat = await User.findOne({ studentID })
        .populate('seat')
      const userWithSpace = await User.findOne({ studentID })
        .populate('space')

      res.json({
        name: userWithSeat.name,
        email: userWithSeat.email,
        studentID,
        seat: userWithSeat.seat,
        space: userWithSpace.space
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
