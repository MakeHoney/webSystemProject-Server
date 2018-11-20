import { User } from '../../models'

export const controller = {
  async register(req, res) {
    const { email, studentID, password, name } = req.body
    try {
      await User.register({ studentID, email, password, name })
      res.json({
        message: 'successfully registered!'
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async login(req, res) {
    const { email, password } = req.body
    const secret = req.app.get('jwt-secret')
    try {
      const token = await User.checkAuth({ email, password, secret })
      res.json({
        message: 'signed in successfully!',
        email,
        token
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
