const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mocha_test')

mongoose.connection.once('open', () => {
    console.log('Mongo connection has been made')
}).on('error', (err) => {
    console.error('Mongo connection error', err)
})
