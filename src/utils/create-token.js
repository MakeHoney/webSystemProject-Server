import jwt from "jsonwebtoken";

export const createToken = async ({ user, secret }) => {
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

export const createEmailToken = async ({ email, studentID, password, name, secret }) => {
  return await jwt.sign(
    {
      email,
      studentID,
      password,
      name
    },
    secret,
    {
      expiresIn: '1h',
      subject: 'emailAuth'
    })
}
