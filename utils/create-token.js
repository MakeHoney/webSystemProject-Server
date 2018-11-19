import jwt from "jsonwebtoken";

export const createToken = ({ user, secret })=> {
	return new Promise((resolve, reject) => {
		jwt.sign(
				{
					_id: user._id,
					email: user.email,
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
}
