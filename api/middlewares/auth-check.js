import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token || req.query.token

  if (!token) {
    return res.status(500).json({
      success: false,
      message: 'user not signed in'
    })
  }

  try {
    req.decoded = await jwt.verify(token, req.app.get('jwt-secret'))
    next()
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    })
  }
}
