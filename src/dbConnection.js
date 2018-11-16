import mongoose from "mongoose";
import { config } from "../config";
module.exports = {
    connect() {
        mongoose.connect(config.mongoURI)
        const db = mongoose.connection
        db.on('error', console.error)
        db.once('open', () => {
            console.log('connected to mongodb server')
        })
    }
}
