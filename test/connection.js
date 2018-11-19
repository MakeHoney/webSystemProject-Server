import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/websi')

mongoose.connection.once('open', () => {
	console.log('Mongo connection has been made')
}).on('error', (err) => {
	console.error('Mongo connection error', err)
})
