const Seat = require('../../models/seat')
const User = require('../../models/user')

exports.reserve = async (req, res) => {
    let { uid, sid } = req.body

    try {
        let user = await User.findOneByUID(uid)
        let seat = await Seat.findOneBySID(sid)

        user.hasSeat()
        seat.isTaken()

        const seatOccupying = {
            floor: seat.floor,
            sid
        }

        user.updateSeatInfo({ seatOccupying })
        seat.updateSeat({ isOccupied: true })

        res.json({
            message: 'successfully reserved'
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

exports.mount = async (req, res) => {
    let { first, second, third, fourth } = req.body
    try {
        await Seat.mount(first, second, third, fourth)
        res.json({
            message: 'mounted!'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
