const assert = require('assert')
const MarioChar = require('./test_models/mariochar')

// Describe tests
describe('Deleting records', () => {
    let char
    beforeEach(async () => {
        char = new MarioChar({
            name: 'Mario'
        })
        await char.save()
    })

    // delete test
    it('Deletes one record from the database', async () => {
        await MarioChar.findOneAndRemove({ name: 'Mario' })
        const result = await MarioChar.findOne({ name: 'Mario' })
        assert(!result)
    })
})
