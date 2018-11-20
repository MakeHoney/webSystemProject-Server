import jwt from "jsonwebtoken";

export const createToken = async ({ user, secret })=> {
  return await jwt.sign(
    {
      _id: user._id,
      email: user.email
    },
    secret,
    {
      expiresIn: '7d',
      subject: 'userInfo'
    })
}
