const assert = require('assert')
const MarioChar = require('./test_models/mariochar')

// Describe tests
describe('Updating records', () => {
    let char
    beforeEach(async () => {
        char = new MarioChar({
            name: 'Mario',
            weight: 50
        })
        await char.save()
    })

    // delete test
    it('Updates one record in the database', async () => {
        await MarioChar.findOneAndUpdate({ name: 'Mario' }, { name: 'Luigi' })
        const result1 = await MarioChar.findOne({ name: 'Mario' })
        const result2 = await MarioChar.findOne({ name: 'Luigi' })

        assert(!result1)
        assert(result2.name === 'Luigi')
    })

    it('Increments the weight by 1', async () => {
        await MarioChar.update({}, { $inc: { weight: -11 } })
        const result = await MarioChar.findOne({ name: 'Mario' })
        assert(result.weight === 39)
    })
})
