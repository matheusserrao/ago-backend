import dotenv from 'dotenv'
dotenv.config()

import app from './app/app'

const PORT = process.env.PORT || 5000

app.getExpress().listen(PORT, () => {
    console.log(`[SERVER]: Started on port: ${PORT}`)
})
