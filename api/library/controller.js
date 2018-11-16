import { User, Seat } from '../../models'

export const controller = {
    async reserveSeat(req, res) {
        const { studentID, sid } = req.body
        try {
            const user = await User.findOne({ studentID })
            const seat = await Seat.findOne({ sid })

            // exception handler
            user.hasSeat('reserve')
            seat.isTaken('reserve')

            await user.update({ sid: seat._id })
            await seat.update({ studentID: user._id })

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
            const user = await User.findOne({studentID})
                .populate('sid')
            // exception handler for user
            user.hasSeat('returnOrExtend')

            const seat = await Seat.findById(user.sid._id)
            // exception handler for seat
            seat.isTaken('returnOrExtend')

            // seat's studentID, occupiedTime 초기화
            await seat.update({studentID: null})
            await seat.update({occupiedTime: null})

            // user's sid 초기화
            await user.update({sid: null})
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
        /*
        * TODO: need exception handling for extension within 2hours
        * */
        try {
            const user = await User.findOne({ studentID })
                .populate('sid')
            // exception handler for user
            user.hasSeat('returnOrExtend')

            const seat = await Seat.findById(user.sid._id)
            // exception handler for seat
            seat.isTaken('returnOrExtend')

            // update time
            await seat.update({ occupiedTime: Date.now() })

            res.json({
                message: 'successfully extended!'
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    async mount(req, res) {
        const { first, second, third, fourth } = req.body
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

}
