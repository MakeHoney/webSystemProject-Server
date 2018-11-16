import { User, Seat } from '../../models'

export const reserveSeat = async (req, res) => {
    const { studentID, sid } = req.body

    try {
        const user = await User.findOneByUID(studentID)
        const seat = await Seat.findOneBySID(sid)

        user.hasSeat()
        seat.isTaken()

        await user.updateSeatInfo({ sid: seat._id })
        await seat.updateSeat({ studentID: user._id })

        res.json({
            message: 'successfully reserved'
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const returnSeat = async (req, res) => {
    const { studentID } = req.body

    // need exception handling (반납할 좌석이 없는 경우)
    try {
        const user = await User.findOne({studentID})
            .populate('sid')

        // seat의 studentID, occupiedTime 초기화
        const seat = await Seat.findById(user.sid._id)
        await seat.update({studentID: null})
        await seat.update({occupiedTime: null})

        // user의 sid 초기화
        await user.update({sid: null})
        res.json({
            message: 'successfully returned!'
        })
    } catch (err) {
        console.error('error occurred', err)
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
