import { Person, Story } from './test_models'
import mongoose from "mongoose";
const assert = require('assert')

// Describe tests
describe('Populate', () => {

    // Drop the characters collection before each test
    beforeEach(async () => {
        // Drop the collection
        try {
            await mongoose.connection.collections.people.drop()
            await mongoose.connection.collections.stories.drop()
        } catch (err) {
            console.error('there is no collection to delete')
        }
    })


    it('Populate test1', async () => {
        let author = new Person({
            name: 'Ian Fleming',
            age: 50
        })
        await author.save()

        let story1 = new Story({
            title: 'Casino Royale',
            author: author._id
        })
        await story1.save()

        const result = await Person.findOne({ name: 'Ian Fleming' })
        const story = await Story.findOne({ title: 'Casino Royale' })
            .populate('author')
        console.log(result)
        console.log(story.author)
        // assert(char.isNew === false)
    })

    // next test
})
