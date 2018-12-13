import { Space } from '../../models'
export const controller = {
  async reserveSpace(req, res) {
    const { studentID, placeName, spaceID, rDate, day, time } = req.body
    try {
      await Space.reserve({ studentID, placeName, spaceID, rDate, day, time })
      res.json({
        message: 'successfully reserved',
        rDate: new Date(Date.UTC(rDate.year, rDate.month - 1, rDate.day, rDate.hour))
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async cancelReservation(req, res) {
    const { studentID } = req.body
    try {
      await Space.cancel({ studentID })
      res.json({
        message: 'successfully canceled'
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async spaceListOfPlace(req, res) {
    const { placeName, spaceID, day, time } = req.body
    console.log(placeName)
    try {
      const spaceList = await Space.list({ placeName, spaceID, day })
      res.json({
        spaceList
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
