import { Seat } from '../../models'

export const controller = {
	async reserveSeat(req, res) {
		const { studentID, sid } = req.body
		try {
			await Seat.reserve({ studentID, sid })
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
		/*
		* TODO: need exception handling for extension within 2hours
		* */
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
	async mountSeat(req, res) {
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
