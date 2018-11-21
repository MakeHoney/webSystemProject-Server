import { User } from "../../src/models"

export default async () => {
  await User.register({
    studentID: '201523483',
    email: 'pourmonreve@ajou.ac.kr',
    password: 'pass',
    name: 'Byunghun'
  })

  await User.register({
    studentID: '201533333',
    email: 'makehoney3@ajou.ac.kr',
    password: 'pass',
    name: 'Makehoney'
  })
}
