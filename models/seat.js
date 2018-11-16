import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Seat = new Schema({
    sid: Number,
    floor: Number,
    occupiedTime: { type: Date, default: Date.now() },
    user: { type: String, ref: 'User', default: '' }
})

// scheduler function
Seat.statics.renewSeat = async function () {
    try {
        // 120 -> 고정된 상수로 변경할 것
        for(let i = 0; i < 120; i++) {
            let seat = await this.findOne({ sid: i })
            const occupiedTime = seat.occupiedTime.getTime()
            const now = new Date().getTime()
            const difference = now - occupiedTime
            // try {
            //     let testSeat = await this.findOne({sid: i}).populate('user')
            // } catch (err) {
            //     console.err(err)
            // }
            let testSeat = await this.findOne({sid: i}).populate('user')
            console.log(testSeat)
            // 2 hours: 60000 * 60 * 2

            if(difference > 60000) {
                // uid -> ''
                // occupied time -> Date.now()
                await seat.update({ user: 5 })
                await seat.save()
            }
        }
    } catch (err) {

    }
}

Seat.statics.findOneBySID = async function (sid) {
    try {
        return await this.findOne({
            sid
        })
    } catch (err) {
        throw new Error(err)
    }
}

Seat.statics.mount = async function (first, second, third, fourth) {
    let sid = 0

    try {
        for (let i = 0; i < arguments.length; i++) {
            for (let j = 0; j < arguments[i]; j++, sid++) {
                let seat = new this({
                    sid,
                    floor: i
                })
                await seat.save()
            }
        }
    } catch (err) {
        throw new Error(err)
    }
}

Seat.methods.updateSeat = async function ({ isOccupied }) {
    try {
        await this.update({ isOccupied })
    } catch (err) {
        throw new Error(err)
    }
}

Seat.methods.isTaken = function () {
    if(this.isOccupied) {
        throw new Error('seat is already taken!')
    }
}

export default mongoose.model('Seat', Seat)
