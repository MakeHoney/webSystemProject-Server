import nodemailer from 'nodemailer'
import { config } from '../config'

export const mailer = {
  transporter: nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.gmailUser,
      pass: config.gmailPass
    }
  }),
  Options: {
    from: config.gmailUser,
    to: '',
    subject: '클리카주 인증 메일입니다.',
    text: '아래 링크를 통해 본인 인증을 해주세요!\n'
  }
}
