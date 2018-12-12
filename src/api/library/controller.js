import { Seat } from '../../models'

export const controller = {
  async reserveSeat(req, res) {
    const { studentID, seatNum } = req.body
    try {
      await Seat.reserve({ studentID, seatNum })
      res.json({
        message: 'successfully reserved'
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async returnSeat(req, res) {
    const { studentID } = req.body
    try {
      await Seat.return({ studentID })
      res.json({
        message: 'successfully returned!'
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async extendSeat(req, res) {
    const { studentID } = req.body
    try {
      await Seat.extend({ studentID })
      res.json({
        message: 'successfully extended!'
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  },
  async seatList(req, res) {
    try {
      const seats = await Seat.find()
      res.json({
        seats
      })
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
  }
}
