import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PersonSchema = Schema({
	name: String,
	age: Number,
	stories: [{ type: Schema.Types.ObjectId, ref: 'story' }]
})

const StorySchema = Schema({
	author: { type: Schema.Types.ObjectId, ref: 'person' },
	title: String,
	fans: [{ type: Schema.Types.ObjectId, ref: 'person' }]
})

export const Person = mongoose.model('person', PersonSchema)
export const Story = mongoose.model('story', StorySchema)
