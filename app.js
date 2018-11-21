import { mailer } from './utils/mailer'

const mailOptions = Object.assign({}, mailer.Options)

mailOptions.to = 'pourmonreve@ajou.ac.kr'

mailer.transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.log(err)
  else console.log(info.response)
})
