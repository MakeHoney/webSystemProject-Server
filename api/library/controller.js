import { User, Seat } from '../../models'

export const reserve = async (req, res) => {
    let { studentID, sid } = req.body

    try {
        let user = await User.findOneByUID(studentID)
        let seat = await Seat.findOneBySID(sid)

        user.hasSeat()
        seat.isTaken()

        const seatOccupying = {
            floor: seat.floor,
            sid,
            default: Date.now(),
            expires: 120
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

export const mount = async (req, res) => {
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
