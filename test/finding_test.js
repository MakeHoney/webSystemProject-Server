const assert = require('assert')
const MarioChar = require('./test_models/mariochar')

// Describe tests
describe('Finding records', () => {
    let char
    beforeEach(async () => {
        char = new MarioChar({
            name: 'Mario'
        })
        await char.save()
    })

    // find test
    it('Finds one record from the database', async () => {
        const result = await MarioChar.findOne({ name: 'Mario' })
        assert(result.name === 'Mario')
    })

    // next test
    it('Finds one record by ID from the database', async () => {
        const result = await MarioChar.findOne({ _id: char._id })
        assert(result._id.toString() === char._id.toString())
    })

})
