import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './dbConnection'
import config from '../config'

const app = express()
db.connect()

app.set('port', process.env.PORT || 8888)
app.set('jwt-secret', config.secret)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ urlencoded: true }))

app.use('/', require('../api'))

app.listen(app.get('port'), () => {
    console.log(`Server Running on port ${app.get('port')}`)
})
