const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

app.set('port', process.env.PORT || 8888)
app.set('jwt-secret', config.secret)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ urlencoded: true }))

app.use('/', require('./api'))

app.listen(app.get('port'), () => {
    console.log(`Server Running on port ${app.get('port')}`)
})

mongoose.connect(config.mongoURI)

const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('connected to mongodb server')
})
