import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'

import databaseConfig from './configs/database'

class App{

    constructor(){
        this.express = express()
        this.express.use(express.json())
        this.db = ''
        this.database()
        this.routes()
    }

    database(){

        mongoose
                .connect(databaseConfig.url_database, databaseConfig.options)
                .catch(({message}) => console.log(message))
        
        this.db = mongoose.connection
        this.db.on('error', error => {
            console.log('[MONGO DB]: Connection error')
            console.log(error)
        })
        this.db.on('connected', connected => {
            console.log('[MONGO DB]: Connected')
        })
        this.db.on('disconnected', disconnected => {
            console.log('[MONGO DB]: Disconnected')
        })
    }
    
    routes(){
        this.express.use(routes)
    }

    getExpress(){
        return this.express
    }
}

export default new App()