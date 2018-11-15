const assert = require('assert')
const MarioChar = require('./test_models/mariochar')

// Describe tests
describe('Saving records', () => {

    // Create tests
    it('Saves a record to the database', async () => {
        let char = new MarioChar({
            name: 'Mario'
        })

        await char.save()
        assert(char.isNew === false)
    })

    // next test

})
