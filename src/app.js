import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { utils } from './utils'
import { config } from '../config'
import api from './api'

const app = express()
utils.dbConnection()

app.set('port', process.env.PORT || 8888)
app.set('jwt-secret', config.secret)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ urlencoded: true }))

app.use('/', api)

app.listen(app.get('port'), () => {
    console.log(`Server Running on port ${app.get('port')}`)
})
