const Seat = require('../../models/seat')

exports.mount = async (req, res) => {
    let { first, second, third, fourth } = req.body
    try {
        await Seat.mount(first, second, third, fourth)
        res.json({
            message: 'mounted!'
        })
    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
}
