import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path: './env'
})

connectDB()

































// import express from 'express'

// const app = express()

/* 
(async () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        app.on("ERROR", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("ERROR: ", error);
        throw error
    }
})()
*/