import { Space } from '../../models'
export const controller = {
  async reserveSpace(req, res) {
    const { studentID, placeName, spaceID, rDate } = req.body

    try {
      await Space.reserve({ studentID, placeName, spaceID, rDate })
      res.json({
        message: 'successfully reserved'
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
  }
}
